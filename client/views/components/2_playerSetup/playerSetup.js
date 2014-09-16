Template.playerSetup.events({
  "submit .player-setup form": function(event) {
    event.preventDefault();

    // make sure this runs only once when the main player is set up
    Deps.nonreactive(function() {
        // load in a song from the top of the playlist if the current
        // song is empty
        if (CurrentSong.find().count() === 0) {
          OJPlayer.nextSong();
        }
        // start off the player paused and make sure loaded status
        // is set as off
        if (CurrentSong.find().count() !== 0) {
          CurrentSong.update(CurrentSong.findOne()._id, {
            $set: {paused: true, loaded: false}
          });
        }
    });

    // use the session id, and not the user id, so it's limited to 1 window
    Settings.update(Settings.findOne()._id, {
      $set: {playerId: Meteor.userId()}
    });

    Meteor.call('set_bar_id', Meteor.userId(), function (error, result) {});
    Session.set("barId", Meteor.userId());
  },

  "click #logout, touchstart #logout": function(event) {
    event.preventDefault();
    // Meteor.logout();

    Meteor.call('set_bar_id', null, function (error, result) {});
    // Meteor.users.update(Meteor.userId(),{
    //   $set: {isBar: false}
    // });
    Session.set("barId", null);
  }

});

// Template.playerSetup.created = function(){
//     Meteor.call('searchSong', "Testify", 5, function(err, result){
//       console.log(result);
//       console.log(err);
//       Session.set("searchSong", result);
//     });
// };


Template.playerSetup.searchSong = function(){
  return Session.get("searchSong");
};

Template.playerSetup.playSong = function(){
  return Session.get("playSong");
};

Template.playerSetup.barId = function(){
  return Session.get("barId");
};


Template.playerSetup.helpers({
  currentSong: function() {
    return CurrentSong.findOne();
  }
});

// Template.playerSetup.events({
//   "click .play, touchstart .play": function(event) {
//     event.preventDefault();
//     var currentTarget = $(event.currentTarget);
//     var songId = currentTarget.context.dataset.id;
//     Meteor.call('playSong', songId, function(err, result){
//       console.log(result);
//       console.log(err);
//       Session.set("playSong", result);
//     });
//   }
// });

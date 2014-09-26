
Meteor.publish("bars", function() {
  Bars._ensureIndex({name: 1}, {unique: 1});
  // Bars._ensureIndex({ "name": 1});
  return Bars.find();
});

// Meteor.publish("settings", function(barId) {
//     var filter = {player_id: 1};
//     return Settings.find({_id: barId}, {fields: filter})
// });

Meteor.publish("playlist", function(barId) {
  return Playlist.find({barId: barId});
});
Meteor.publish("currentSong", function(barId) {
  // var filter = {name: 1, owner: 1};
  return CurrentSong.find({barId: barId}, {limit: 1});
  // return CurrentSong.find({}, {limit: 1});
});

Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'money': 1}});
});

Meteor.publish(null, function (){
  return Meteor.roles.find({})
})

// Streams
Chat = new Meteor.Stream("chat");
PlaylistTracker = new Meteor.Stream("playlistTracker");

Chat.permissions.write(function(event) {
  return true;
});

Chat.permissions.read(function(event) {
  return true;
});

PlaylistTracker.permissions.write(function(event) {
  return true;
});

PlaylistTracker.permissions.read(function(event) {
  return true;
});

Chat.addFilter(function(eventName, args) {
  // switch the user id with the user's name
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (args[0] && user && user.name) {
      return [args[0], user.name];
    }
  }
  return args;
});

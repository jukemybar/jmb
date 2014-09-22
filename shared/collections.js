Settings = new Meteor.Collection("settings");
Playlist = new Meteor.Collection("playlist");
CurrentSong = new Meteor.Collection("currentSong");
Bars = new Meteor.Collection("bars");

// var isMainPlayer = function() {
<<<<<<< HEAD
//   console.log(Meteor.connection);
=======
>>>>>>> 3b7a1772b79639474864a93df7d7c56369dc7596
//   if (Settings.findOne().playerId || !Meteor.connection._lastSessionId) {
//     return true;
//   }
//   return Settings.findOne().playerId === Meteor.connection._lastSessionId;
// }

<<<<<<< HEAD
var isMainPlayer = function(userId) {
  // console.log(Bars.find({_id: }));
  return true;
}

Bars.allow({
  'insert': function(userId, doc) {
    return Bars.find({name: doc.name}).count() === 0;
  },
  'update': function(userId, doc, fieldNames, modifier) {
    // return doc.playerId === 0 || isMainPlayer();
    return true;
  },
  'remove': function(userId, doc) {
    return false;
  }
});
=======
var isMainPlayer = function() {
  return Meteor.userId() === Session.get("barId");
}
>>>>>>> 3b7a1772b79639474864a93df7d7c56369dc7596

Settings.allow({
  'insert': function(userId, doc) {
    return true;
  },
  'update': function(userId, doc, fieldNames, modifier) {
<<<<<<< HEAD
    // return doc.playerId === 0 || isMainPlayer();
    return true;
=======
    return doc.playerId === 0 || doc.playerId === userId;
>>>>>>> 3b7a1772b79639474864a93df7d7c56369dc7596
  },
  'remove': function(userId, doc) {
    return false;
  }
});

Playlist.allow({
  'insert': function(userId, doc) {
    // if it's already in the playlist, don't allow
    if (Playlist.findOne({uri: doc.uri})) {
      return false;
    }
    return true;
  },
  'update': function(userId, doc, fieldNames, modifier) {
    return true;
  },
  'remove': function(userId, doc) {
    // only allowed to remove the songs you added
    return isMainPlayer(userId) || doc.addedByUserId === userId;
  }
});

CurrentSong.allow({
  'insert': function(userId, doc) {
    return isMainPlayer(userId);
  },
  'update': function(userId, doc, fieldNames, modifier) {
    return true;
  },
  'remove': function(userId, doc) {
    return isMainPlayer(userId);
  }
});

Meteor.users.allow({
    update: function(userId, doc){
      // console.log(doc);
        return doc._id === userId; // can update their own profile
    }
});
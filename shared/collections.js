Settings = new Meteor.Collection("settings");
Playlist = new Meteor.Collection("playlist");
CurrentSong = new Meteor.Collection("currentSong");

var isMainPlayer = function() {
  if (Settings.findOne().playerId || !Meteor.connection._lastSessionId) {
    return true;
  }
  return Settings.findOne().playerId === Meteor.connection._lastSessionId;
}

// var isMainPlayer = function() {
//   return Meteor.userId() === Session.get("barId");
// }

Settings.allow({
  'insert': function(userId, doc) {
    return true;
  },
  'update': function(userId, doc, fieldNames, modifier) {
    return doc.playerId === 0 || isMainPlayer();
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
    return isMainPlayer() || doc.addedByUserId === userId;
  }
});

CurrentSong.allow({
  'insert': function(userId, doc) {
    return isMainPlayer();
  },
  'update': function(userId, doc, fieldNames, modifier) {
    return true;
  },
  'remove': function(userId, doc) {
    return isMainPlayer();
  }
});

Meteor.users.allow({
    update: function(userId, doc){
      // console.log(doc);
        return doc._id === userId; // can update their own profile
    }
});
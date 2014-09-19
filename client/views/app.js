// Template.app.helpers({
//   playerIsSetup: function() {
//     return Settings.findOne().playerId;
//   }
// })

Template.app.helpers({
  playerIsSetup: function() {
    return Settings.findOne().playerId;
  }
})

Template.bar.helpers({
  playerIsSetup: function() {
    return Session.get("barId");
  }
})
// Template.app.helpers({
//   playerIsSetup: function() {
//     return Settings.findOne().playerId;
//   }
// })

Template.app.helpers({
  playerIsSetup: function() {
<<<<<<< HEAD
    return Session.get("barId") && Bars.findOne(Session.get("barId")) && Bars.findOne(Session.get("barId")).playerId;
=======
    return Session.get("barId");
>>>>>>> 3b7a1772b79639474864a93df7d7c56369dc7596
  }
})

Template.bar.helpers({
  playerIsSetup: function() {
    return Session.get("barId");
  }
})
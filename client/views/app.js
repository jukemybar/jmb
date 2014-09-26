Template.app.helpers({
  playerIsSetup: function() {
    return Session.get("barId") && Bars.find(Session.get("barId")) && Bars.findOne(Session.get("barId")).playerId;
  }
})

Template.bar.helpers({
  playerIsSetup: function() {
    return Session.get("barId");
  }
})
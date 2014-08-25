Meteor.startup(function() {
  // initial setup
  if (!Settings.find().count() === 0) {
    Settings.insert({
      playerId: 0,
    });
  }
  ServiceConfiguration.configurations.remove({
    $or: [ {service: "facebook"}, {service: "twitter"}, {service: "google"} ]
  });
  // Add Google configuration entry
  ServiceConfiguration.configurations.insert({
    "service": "google",
    "clientId": "80599452496-khm9fh2kk4uk7hd0v6048tpj79qjdorg.apps.googleusercontent.com",
    "secret": "VdBhGwxwOJARmuXClP1zAoq2"
  });
});

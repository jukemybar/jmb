// using code from https://github.com/mizzao/meteor-accounts-testing
Accounts.registerLoginHandler(function(loginRequest) {
  var user, userId;
  if (!loginRequest.username) {
    return;
  }
  user = Meteor.users.findOne({
    username: loginRequest.username
  });
  if (!user) {
    userId = Accounts.insertUserDoc({}, {
      username: loginRequest.username
    });
  } else {
    userId = user._id;
  }
  return {
    userId: userId
  };
});

Accounts.onCreateUser(function(options, user) {
  var profile, _ref, _ref1, _ref2, _ref3, _ref4;
  console.log('onCreateUser', options, user);
  profile = options.profile || {};
  if (((_ref = user.services) != null ? _ref.password : void 0) != null) {
    profile = options.profile || {};
    profile.name = user.username;
    user.name = user.username;
  }
  _.extend(profile, user);

  user.profile = profile;
  user.name = profile.name;
  user.url = profile.url || '';
  user.image = profile.image || {
    url: 'http://b.static.ak.fbcdn.net/rsrc.php/v1/yo/r/UlIqmHJn-SK.gif'
  };
  console.log('onCreateUser end', options, user);
  return user;
});


// Accounts.onCreateUser(function (options, user) {
//   if (user.services) {
//       var service = _.keys(user.services)[0];
//       var email = user.services[service].email;

//       if (!user.profile)
//           user.profile = {};
//       if (!user.profile.name && user.services[service].username)
//           user.profile.name = user.services[service].username;
//       if (!user.profile.name && user.services[service].name)
//          user.profile.name = user.services[service].name;

//       user.services[service] = user.services[service];
//       eser.services.resume.loginTokens.push(
//           user.services.resume.loginTokens[0]
//       );

//       if (!email)
//           return user;

//       // see if any existing user has this email address, otherwise create new
//       var existingUser = Meteor.users.findOne({'emails.address': email});

//       if (!existingUser)
//           return user;

//       // precaution, these will exist from accounts-password if used
//       if (!existingUser.services)
//           existingUser.services = { resume: { loginTokens: [] }};
//       if (!existingUser.services.resume)
//           existingUser.services.resume = { loginTokens: [] };

//       // copy accross new service info
//       existingUser.services[service] = user.services[service];
//       existingUser.services.resume.loginTokens.push(
//           user.services.resume.loginTokens[0]
//       );

//       // even worse hackery
//       Meteor.users.remove({_id: existingUser._id}); // remove existing record
//       return existingUser;                          // record is re-inserted
//   }
// });

// if the connection that just logged out is the one hosting the jukebox,
// notify the rest of the clients that there is no player anymore
UserStatus.events.on("connectionLogout", function(fields) {
  var settings = Settings.findOne();
  if (settings && settings.playerId && fields.connectionId &&
      settings.playerId === fields.connectionId) {
    Settings.update(settings._id, {
      $set: {playerId: 0}
    });
  }
});
// on a connection login, check whether the player is still active.
// a page reload may have happened
UserStatus.events.on("connectionLogin", function(fields) {
  var settings = Settings.findOne();
  if (!UserStatus.connections.findOne({_id: settings.playerId})) {
    Settings.update(settings._id, {
      $set: {playerId: 0}
    });
  }
});



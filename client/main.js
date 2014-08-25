Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

// using code from https://github.com/mizzao/meteor-accounts-testing
Meteor.insecureUserLogin = function(username, callback) {
    return Accounts.callLoginMethod({
        methodArguments: [{
            username: username
        }],
        userCallback: callback
    });
};

Meteor.startup(function() {
    Session.setDefault("selectedTab", "playlist");
    Session.setDefault("missedChats", 0);
    Session.setDefault("missedPlaylist", 0);
    if (Settings.find().count() === 0) {
        Settings.insert({
            playerId: 0,
        });
    }
});

Accounts.ui.config({
    requestPermissions: {
        google: ['https://www.googleapis.com/auth/musicmanager', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/plus.login'],
        facebook: ['email', 'read_friendlists', 'read_stream', 'user_photos', 'user_relationships', 'user_status']
    },
    requestOfflineToken: {
        google: true
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});
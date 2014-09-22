Router.map(function() {
    // single page app
    // this template will be returned for all routes
    this.route('app', {
        path: '/',
        waitOn: function() {
            console.log("barId routes "+Session.get("barId"));
            return [
<<<<<<< HEAD
                Meteor.subscribe("settings", Session.get("barId")),
                Meteor.subscribe("currentSong", Session.get("barId")),
                Meteor.subscribe("playlist", Session.get("barId")),
                Meteor.subscribe("bars"),
=======
                Meteor.subscribe("settings"),
                Meteor.subscribe("currentSong"),
                Meteor.subscribe("playlist"),
>>>>>>> 3b7a1772b79639474864a93df7d7c56369dc7596
                Meteor.subscribe('userData')
            ];
        },
        onRun: function() {
            Session.set("loading", false);
            // Session.set("barId", null);
        }
    });

    this.route('bar', {
        path: '/:_id',
        waitOn: function() {
            return [
<<<<<<< HEAD
                Meteor.subscribe("settings", Session.get("barId")),
                Meteor.subscribe("currentSong", Session.get("barId")),
                Meteor.subscribe("playlist", Session.get("barId")),
                Meteor.subscribe("bars"),
=======
                Meteor.subscribe("settings"),
                Meteor.subscribe("currentSong"),
                Meteor.subscribe("playlist"),
>>>>>>> 3b7a1772b79639474864a93df7d7c56369dc7596
                Meteor.subscribe('userData')
            ];
        },
        onRun: function() {
            Session.set("loading", false);
            Session.set("barId", this.params._id);
        }
    });
});
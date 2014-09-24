Router.map(function() {
    // single page app
    // this template will be returned for all routes
    this.route('app', {
        path: '/',
        waitOn: function() {
            console.log("barId routes "+Session.get("barId"));
            return [
                Meteor.subscribe("settings", Session.get("barId")),
                Meteor.subscribe("currentSong", Session.get("barId")),
                Meteor.subscribe("playlist", Session.get("barId")),
                Meteor.subscribe("bars"),
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
                Meteor.subscribe("settings", Session.get("barId")),
                Meteor.subscribe("currentSong", Session.get("barId")),
                Meteor.subscribe("playlist", Session.get("barId")),
                Meteor.subscribe("bars"),
                Meteor.subscribe('userData')
            ];
        },
        onRun: function() {
            Session.set("loading", false);
            Session.set("barId", this.params._id);
        }
    });
});
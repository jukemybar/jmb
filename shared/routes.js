Router.map(function() {
    // single page app
    // this template will be returned for all routes
    this.route('app', {
        path: '/',
        waitOn: function() {
            return [
                Meteor.subscribe("settings"),
                Meteor.subscribe("currentSong"),
                Meteor.subscribe("playlist"),
                Meteor.subscribe('userData')
            ];
        },
        onRun: function() {
            Session.set("loading", false);
        }
    });

    this.route('bar', {
        path: '/:_id',
        waitOn: function() {
            return [
                Meteor.subscribe("settings"),
                Meteor.subscribe("currentSong"),
                Meteor.subscribe("playlist"),
                Meteor.subscribe('userData')
            ];
        },
        onRun: function() {
            Session.set("loading", false);
            Session.set("barId", this.params._id);
        }
    });
});
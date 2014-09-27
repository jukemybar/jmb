Meteor.startup(function() {
    // // initial setup
    // if (!Bars.find().count() === 0) {
    //     Bars.insert({
    //         playerId: 0,
    //     });
    // }

    ServiceConfiguration.configurations.remove({
        $or: [{
            service: "facebook"
        }, {
            service: "twitter"
        }, {
            service: "google"
        }]
    });

    if (Meteor.settings.public) {
        console.log("Deploy on public visibility");
        ServiceConfiguration.configurations.insert({
            service: "google",
            clientId: "210125678365-2mvnbne2vku48el47i1a808b34vk3ttm.apps.googleusercontent.com",
            secret: "fudhxhZGnavEM8lszQkbV-h8"
        });
    } else {
        console.log("Deploy on private/localhost");
        ServiceConfiguration.configurations.insert({
            service: "google",
            clientId: "683764162464-17kafe2t7q6ofpama9lrdv9q63u78cp6.apps.googleusercontent.com",
            secret: "k2yy6BJorow_eD09RQr8Wb7_"
        });
    }

    // Add Google configuration entry
    //jmb.meteor.com
    // ServiceConfiguration.configurations.insert({
    //   service: "google", clientId: "80599452496-2qof1vreif0kfki7ugcbb74d918smko8.apps.googleusercontent.com", secret: "YUqQ_fvAjBd3oDbLxrazWgXp"
    // });

    //localhost:4000
    // ServiceConfiguration.configurations.insert({
    //   service: "google", clientId: "80599452496-khm9fh2kk4uk7hd0v6048tpj79qjdorg.apps.googleusercontent.com", secret: "VdBhGwxwOJARmuXClP1zAoq2"
    // });
});
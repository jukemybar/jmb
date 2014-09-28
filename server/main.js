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
        ServiceConfiguration.configurations.insert({
            service: "facebook",
            appId: "352016194893721",
            secret: "02cb35c71f1197ab29335dc1800cfd6f"
        });
    } else {
        console.log("Deploy on private/localhost");
        ServiceConfiguration.configurations.insert({
            service: "google",
            clientId: "683764162464-17kafe2t7q6ofpama9lrdv9q63u78cp6.apps.googleusercontent.com",
            secret: "k2yy6BJorow_eD09RQr8Wb7_",
        });
        ServiceConfiguration.configurations.insert({
            service: "facebook",
            appId: "684759794952691",
            secret: "e7581a29155cab6716d1a851f050300e"
        });
    }

});
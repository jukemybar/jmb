Meteor.methods({
    getOnlineUserCount: function() {
        return Meteor.users.find({
            "status.online": true
        }).count();
    },


    refreshOAuthToken: function(service) {
        var getNewAccessToken, oAuthRefreshBody, storeNewAccessToken, token;
        getNewAccessToken = function(service) {
            var result, _ref;
            result = Meteor.http.post(service.url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                content: oAuthRefreshBody(service)
            });
            return (_ref = result.data) != null ? _ref.access_token : void 0;
        };
        oAuthRefreshBody = function(service) {
            var loginServiceConfig;
            loginServiceConfig = Accounts.loginServiceConfiguration.findOne({
                service: service.name
            });
            return 'refresh_token=' + Meteor.user().services[service.name].refreshToken + '&client_id=' + loginServiceConfig.clientId + '&client_secret=' + loginServiceConfig.secret + '&grant_type=refresh_token';
        };
        storeNewAccessToken = function(service, newAccessToken) {
            var o;
            o = {};
            o['services.' + service.name + '.accessToken'] = newAccessToken;
            return Meteor.users.update(Meteor.userId(), {
                $set: o
            });
        };
        token = getNewAccessToken(service);
        console.log("Got new access token " + token + " for", service);
        storeNewAccessToken(service, token);
        return token;
    },

    searchSong: function searchSong(search, maxRes) {
        var PlayMusic = Meteor.require('playmusic');

        console.log("____________________________________");
        console.log(Meteor.user().services);
        console.log(Meteor.user().services.google.refreshToken);
        console.log("____________________________________");
        var opts = {
            email: Meteor.user().profile.services.google.email,
            consumerKey: "80599452496-khm9fh2kk4uk7hd0v6048tpj79qjdorg.apps.googleusercontent.com",
            consumerSecret: "VdBhGwxwOJARmuXClP1zAoq2",
            token: Meteor.user().services.google.accessToken,
            refreshToken: Meteor.user().services.google.refreshToken
        };
        var pm = new PlayMusic({
            version: "0.2.0"
        }, opts);

        var songs = Async.runSync(function(done) {

            pm.getLibrary(function(library) {
                var tracks = library.data.items;
                done(null, tracks);
            });
        });

        return songs.result;
    },

    playSong: function playSong(songId) {
        var PlayMusic = Meteor.require('playmusic');
        var pm = new PlayMusic({
            version: "0.2.0"
        });

        var songs = Async.runSync(function(done) {
            pm.init({
                email: "nicolas.gumy@gmail.com",
                password: "wvbxcrxpltcbgypq"
            }, function() {
                pm.getStreamUrl(songId, function(url) {
                    console.log(url);
                    done(null, url);
                });
            })
        });

        return songs.result;
    },
    mergeItems: function(mergedUserId) {
        console.log('Merging DB items of user' + mergedUserId + 'with user' + Meteor.userId());
    },
    set_bar_id: function(user_id){
        console.log("HOIUHOI");
        console.log(user_id);
        // Meteor.users.update(user_id,{
        //   $set: {isBar: true}
        // });
    }
});
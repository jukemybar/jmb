Template.playerSetup.events({
    "submit .player-setup form": function(event) {
        event.preventDefault();

        if ($("#box-name").val() === "")
            return;

        // make sure this runs only once when the main player is set up
        Deps.nonreactive(function() {
            // load in a song from the top of the playlist if the current
            // song is empty
            if (CurrentSong.find().count() === 0) {
                OJPlayer.nextSong();
            }
            // start off the player paused and make sure loaded status
            // is set as off
            if (CurrentSong.find().count() !== 0) {
                CurrentSong.update(CurrentSong.findOne()._id, {
                    $set: {
                        paused: false,
                        loaded: false
                    }
                });
            }
        });

        var bar = {};
        bar.name = $("#box-name").val();
        bar.addedAt = new Date();
        // bar.pos = {type: "Point", coordinates: [Session.get("pos").lon, Session.get("pos").lat]};
        bar.playerId = Meteor.connection._lastSessionId;
        bar.userId = Meteor.userId();

        Bars.insert(bar,
            function(error, result) {
                if (result) {
                    // use the session id, and not the user id, so it's limited to 1 window
                    Session.set("barId", result);
                    // Meteor.call('set_bar_id', this._id, function (error, result) {});
                } else {
                    $(".error").fadeIn("fast").delay(1000).fadeOut("slow");
                }
            }
        );


    },

    "click #logout, touchstart #logout": function(event) {
        event.preventDefault();
        // Meteor.logout();

        Meteor.call('set_bar_id', null, function(error, result) {});
        Meteor.users.update(Meteor.userId(), {
            $set: {
                isBar: false
            }
        });
        Session.set("barId", null);
    },

    "click #select-bar, touchstart #select-bar": function(event) {
        event.preventDefault();
        var currentId = this._id;
        Bars.update(this._id, {
                $set: {
                    playerId: Meteor.connection._lastSessionId
                }
            },
            function(error, result) {
                if (result) {
                    Session.set("barId", currentId);
                    // make sure this runs only once when the main player is set up
                    Deps.nonreactive(function() {
                        // load in a song from the top of the playlist if the current
                        // song is empty
                        if (CurrentSong.find().count() === 0) {
                            OJPlayer.nextSong();
                        }
                        // start off the player paused and make sure loaded status
                        // is set as off
                        if (CurrentSong.find().count() !== 0) {
                            CurrentSong.update(CurrentSong.findOne()._id, {
                                $set: {
                                    paused: false,
                                    loaded: false
                                }
                            });
                        }
                    });
                    // use the session id, and not the user id, so it's limited to 1 window
                    // Meteor.call('set_bar_id', this._id, function (error, result) {});
                } else {
                    $(".error").fadeIn("fast").delay(1000).fadeOut("slow");
                }
            }
        );
    }

});

// Template.playerSetup.created = function(){
//     Meteor.call('searchSong', "Testify", 5, function(err, result){
//       console.log(result);
//       console.log(err);
//       Session.set("searchSong", result);
//     });
// };


// Template.playerSetup.bars = function(){
//   return Bars.find();
// };

Template.playerSetup.barId = function() {
    return Session.get("barId");
};


Template.playerSetup.helpers({
    currentSong: function() {
        return CurrentSong.findOne();
    },
    bars: function() {
        return Bars.find({
            //     pos : {
            //         $near : {
            //             $geometry : {
            //                 type : "Point",
            //                 coordinates: [ Session.get("pos").lon || 0, Session.get("pos").lat || 0 ]
            //             }
            //         }
            //     }
            // }, {
            //     limit: 100  // Return only the nearest 100 results
        }, {
            sort: {
                addedAt: -1
            }
        });
    },
    pos: function() {
        return Session.get("pos");
    }
});

// Template.playerSetup.events({
//   "click .play, touchstart .play": function(event) {
//     event.preventDefault();
//     var currentTarget = $(event.currentTarget);
//     var songId = currentTarget.context.dataset.id;
//     Meteor.call('playSong', songId, function(err, result){
//       console.log(result);
//       console.log(err);
//       Session.set("playSong", result);
//     });
//   }
// });

Meteor.startup(function() {
    // startWatchingGeolocation();
});


function startWatchingGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
        navigator.geolocation.watchPosition(function(p) {
            // console.log('Got Position', pos);

            if (!p.coords.latitude || !p.coords.longitude) {
                console.warn("Position doesn't have lat/lng. Ignoring", pos);
                return; // we don't want yer lousy geolocation anyway.
            }

            var pos = {
                timestamp: p.timestamp,
                coords: {
                    latitude: p.coords.latitude,
                    longitude: p.coords.longitude,
                    accuracy: p.coords.accuracy,
                    heading: p.coords.heading,
                    speed: p.coords.speed,
                    altitude: p.coords.altitude,
                    altitudeAccuracy: p.coords.altitudeAccuracy
                }
            }

            Session.set("pos", {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
                zoom: 16
            });

        }, error, {
            enableHighAccuracy: false,
            maximumAge: 60000,
            timeout: 100000
        });

    } else {
        error('geolocation not supported');
    }
}

function error(msg) {
    console.log(arguments);
}
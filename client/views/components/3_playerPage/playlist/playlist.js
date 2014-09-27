Template.playlist.helpers({
    currentSong: function() {
        return CurrentSong.findOne();
    },
    song: function() {
        return Playlist.find({}, {
            // sort by voteTotal, which is upvotes - downVotes,
            // breaking ties by time added
            sort: [
                ["money", "desc"],
                ["voteTotal", "desc"],
                ["addedAt", "asc"]
            ]
        });
    },
    monneyUpIcon: function() {
        return "fa-usd";
    },
    thumbUpIcon: function() {
        return _.contains(this.userIdsWhoVotedUp, Meteor.userId()) ?
            "fa-thumbs-up" : "fa-thumbs-o-up";
    },
    thumbDownIcon: function() {
        return _.contains(this.userIdsWhoVotedDown, Meteor.userId()) ?
            "fa-thumbs-down" : "fa-thumbs-o-down";
    },
    moneyDisabled: function() {
        return Meteor.user().username ? "money-disabled" : "";
    },
    voteDisabled: function() {
        return (_.contains(this.userIdsWhoVotedUp, Meteor.userId()) ||
                _.contains(this.userIdsWhoVotedDown, Meteor.userId()) ||
                this.addedByUserId === Meteor.userId()) ?
            "vote-disabled" : "";
    },
    tooltipUp: function() {
        return (_.contains(this.userIdsWhoVotedUp, Meteor.userId()) ||
                _.contains(this.userIdsWhoVotedDown, Meteor.userId()) ||
                this.addedByUserId === Meteor.userId()) ?
            "You've added this song or already voted it up" : "Vote this song up";
    },
    tooltipDown: function() {
        return (_.contains(this.userIdsWhoVotedUp, Meteor.userId()) ||
                _.contains(this.userIdsWhoVotedDown, Meteor.userId()) ||
                this.addedByUserId === Meteor.userId()) ?
            "You've added this song or already voted it down" : "Vote this song down";
    },
    noSongs: function() {
        return CurrentSong.find().count() === 0;
    },
    removeSongIcon: function() {
        return this.addedByUserId === Meteor.userId() ? "fa-times" : "";
    },
    removeDisabled: function() {
        return this.addedByUserId === Meteor.userId() ? "" : "remove-disabled";
    },
    tooltipRemove: function() {
        return this.addedByUserId === Meteor.userId() ? "Remove from playlist" : "";
    },
    barName: function(){
        return Bars.findOne(Session.get("barId")).name
    }
});

Template.playlist.events({
    "click .money, touchstart .money": function(event) {
        event.preventDefault();
        var currentTarget = $(event.currentTarget);
        if (currentTarget.hasClass("money-disabled")) {
            return;
        }
        if (!Meteor.user().money || Meteor.user().money < 1){
          var tab = $(".tab-premium");
          // if not selected
          if (!tab.hasClass("selected")) {
              // unselect the rest
              $(".tab.selected").removeClass("selected");
              // select it
              tab.addClass("selected");
          }
          $(".playlist").hide();
          $(".search").hide();
          $(".chat").hide();
          $(".premium").show();
          Session.set("selectedTab", "premium");
          return;
        }

        Meteor.users.update({
            _id: Meteor.userId()
        }, {
            $inc: {
                money: -1
            }
        });

        Playlist.update(this._id, {
            // $push: {userIdsWhoVotedUp: Meteor.userId()},
            $inc: {
                money: 1
            }
        });
    },
    "click .upvote": function(event) {
        event.preventDefault();
        var currentTarget = $(event.currentTarget);
        if (currentTarget.hasClass("vote-disabled")) {
            return;
        }

        Playlist.update(this._id, {
            $push: {
                userIdsWhoVotedUp: Meteor.userId()
            },
            $inc: {
                upvotes: 1,
                voteTotal: 1
            }
        });
        $(event.currentTarget).addClass("vote-disabled");
    },
    "click .downvote": function(event) {
        event.preventDefault();
        var currentTarget = $(event.currentTarget);
        if (currentTarget.hasClass("vote-disabled")) {
            return;
        }

        // remove the song if it's unanimously downvoted
        var downvotes = this.downvotes;
        Meteor.call("getOnlineUserCount", function(error, result) {
            if (result > 2 && downvotes >= result - 2) {
                Playlist.remove(this._id);
            }
        });
        Playlist.update(this._id, {
            $push: {
                userIdsWhoVotedDown: Meteor.userId()
            },
            $inc: {
                downvotes: 1,
                voteTotal: -1
            }
        });
        $(event.currentTarget).addClass("vote-disabled");
    },
    "click .remove-song": function(event) {
        event.preventDefault();
        var currentTarget = $(event.currentTarget);
        if (currentTarget.hasClass("remove-disabled")) {
            return;
        }
        Playlist.remove(this._id);
    }
});
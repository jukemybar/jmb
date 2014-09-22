Template.topBar.events({
    "click .tab-playlist, touchstart .tab-playlist": function(event) {
        var tab = $(".tab-playlist");
        // if not selected
        if (!tab.hasClass("selected")) {
            // unselect the rest
            $(".tab.selected").removeClass("selected");
            // select it
            tab.addClass("selected");
        }
        $(".chat").hide();
        $(".search").hide();
        $(".premium").hide();
        $(".playlist").show();
        Session.set("selectedTab", "playlist");
        Session.set("missedPlaylist", 0);
    },
    "click .tab-chat, touchstart .tab-chat": function(event) {
        var tab = $(".tab-chat");
        // if not selected
        if (!tab.hasClass("selected")) {
            // unselect the rest
            $(".tab.selected").removeClass("selected");
            // select it
            tab.addClass("selected");
        }
        $(".playlist").hide();
        $(".search").hide();
        $(".premium").hide();
        $(".chat").show();
        Session.set("selectedTab", "chat");
        Session.set("missedChats", 0);
    },
    "click .tab-search, touchstart .tab-search": function(event) {
        var tab = $(".tab-search");
        // if not selected
        if (!tab.hasClass("selected")) {
            // unselect the rest
            $(".tab.selected").removeClass("selected");
            // select it
            tab.addClass("selected");
        }
        $(".chat").hide();
        $(".playlist").hide();
        $(".premium").hide();
        $(".search").show();
        Session.set("selectedTab", "search");
    },
    "click .tab-premium, touchstart .tab-premium": function(event) {
        var tab = $(".tab-premium");
        // if not selected
        if (!tab.hasClass("selected")) {
            // unselect the rest
            $(".tab.selected").removeClass("selected");
            // select it
            tab.addClass("selected");
        }
        $(".chat").hide();
        $(".playlist").hide();
        $(".search").hide();
        $(".premium").show();
        Session.set("selectedTab", "premium");
    },
});

Template.playerPage.created = function() {
    Session.set("missedPlaylist", 0);
    Session.set("missedChats", 0);
    Session.set("selectedTab", "playlist");
    console.log(Settings.find().fetch());
    Settings.update(Settings.findOne()._id,{
      $set: {
        barId: Session.get("barId"),
        playerId: Meteor.connection._lastSessionId
      }
    });
    // console.log(Settings.find().fetch());

}

Template.topBar.helpers({
    missedChats: function() {
        return Session.get("missedChats") ? " (" + Session.get("missedChats") + ")" : "";
    },
    missedPlaylist: function() {
        return Session.get("missedPlaylist") ? " (" + Session.get("missedPlaylist") + ")" : "";
    },
    currentMoney: function() {
        var user = Meteor.user();
        if (user && user.money)
            return user.money;
    }
})
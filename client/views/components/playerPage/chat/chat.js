// max number of chat messages to show
var maxChats = 200;

Chat = new Meteor.Stream("chat");
ChatCollection = new Meteor.Collection(null);

var addChatMessage = function(message, username, pic) {
  ChatCollection.insert({
    pic: pic,
    username: username,
    message: message,
    time: new Date()
  });
  if (!Session.equals("selectedTab", "chat")) {
    Session.set("missedChats", Session.get("missedChats") + 1);
  }
}
Chat.on("chat", function(message, username, pic) {
  addChatMessage(message, username, pic);
});

Template.chat.helpers({
  message: function() {
    return ChatCollection.find({}, {
      limit: maxChats,
      sort: [["time", "desc"], ["username", "asc"]]
    });
  },
});

Template.chatMessage.helpers({
  formattedTime: function() {
    return moment(this.time).format("H:mm");
  }
});

Template.chat.events({
  "submit .chat form": function(event) {
    event.preventDefault();

    var user = Meteor.users.findOne(Meteor.userId());
    var message = $(".chat form input");
    // don't do anything if the message is empty
    if (message.val()) {
      addChatMessage(message.val(), user.username, Meteor.user().profile.services.google.picture);
      Chat.emit("chat", message.val(), user.username, Meteor.user().profile.services.google.picture);
      message.val("");
    }
  }
});


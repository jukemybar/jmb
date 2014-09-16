Template.premium.events({

  "click #logout, touchstart #logout": function(event) {
    event.preventDefault();
    Meteor.logout();
  },
  "click #exit-bar, touchstart #exit-bar": function(event) {
    event.preventDefault();
    Session.set("barId", null);
  }

});

Template.premium.helpers({
  user: function() {
    return Meteor.user();
  },
  moneyMessage: function(){
    if (Meteor.user().money < 1){
      return "Rebuy some coins !"
    }
    return Session.get("moneyMessage");
  }
});

Template.premium.events({
  'submit #paypal-payment-form': function(evt, tmp){
    evt.preventDefault();

    var card_data = Template.paypalCreditCardForm.card_data();
    console.log(card_data);

    //Probably a good idea to disable the submit button here to prevent multiple submissions.

    Meteor.Paypal.purchase(card_data, {total: '1.50', currency: 'USD'}, function(err, results){
      if (err) console.error(err);
      else console.log(results);
    });
  },
  'keyup input': function(evt, tmp){
    $.fn.validateCreditCard.call(evt);
  }
});

Template.premium.card_data = function(){
  return {
      type: $('#card-type').val(),
      name: $('#name').val(),
      number: $('#card-number').val(),
      expire_month: $('#expire-month').val(),
      expire_year: $('#expire-year').val(),
      cvv: $('#cvv').val()
  };
};

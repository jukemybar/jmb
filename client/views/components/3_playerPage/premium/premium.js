Template.premium.events({

<<<<<<< HEAD
    "click #logout, touchstart #logout": function(event) {
        event.preventDefault();
        Session.set("barId", null);
        Settings.update(Settings.findOne()._id, {
          $set: {playerId: 0}
        });

        Meteor.logout();
    },
    "click #exit-bar, touchstart #exit-bar": function(event) {
        event.preventDefault();
        Session.set("barId", null);
        Settings.update(Settings.findOne()._id, {
          $set: {playerId: 0}
        });
    }
=======
  "click #logout, touchstart #logout": function(event) {
    event.preventDefault();
    Meteor.logout();
  },
  "click #exit-bar, touchstart #exit-bar": function(event) {
    event.preventDefault();
    Session.set("barId", null);
  }
>>>>>>> 3b7a1772b79639474864a93df7d7c56369dc7596

});

Template.premium.helpers({
<<<<<<< HEAD
    user: function() {
        return Meteor.user();
    },
    moneyMessage: function() {
        if (Meteor.user().money < 1) {
            return "Rebuy some coins !"
        }
        return Session.get("moneyMessage");
    }
});

Template.premium.events({
    'submit #paypal-payment-form': function(evt, tmp) {
        evt.preventDefault();

        var card_data = Template.premium.card_data();

        console.log(card_data);

        //Probably a good idea to disable the submit button here to prevent multiple submissions.

        Meteor.Paypal.purchase(card_data, {
            total: '1.50',
            currency: 'USD'
        }, function(err, results) {
            if (err) console.error(err);
            else console.log(results);
        });
    }
});

Template.premium.rendered = function() {

    $('#card_number').validateCreditCard(function(result) {
        $('#card_number').removeAttr('class');
        if (result.card_type == null) {
            $('.vertical.maestro').slideUp({
                duration: 200
            }).animate({
                opacity: 0
            }, {
                queue: false,
                duration: 200
            });
            return;
        }

        $('#card-type').val(result.card_type.name);
        $('#card_number').addClass(result.card_type.name);

        if (result.length_valid && result.luhn_valid) {
            return $('#card_number').addClass('valid');
        } else {
            return $('#card_number').removeClass('valid');
        }
    }, {
        accept: ['visa', 'visa_electron', 'mastercard', 'discover', 'americanexpress']
    });

}

Template.premium.card_data = function() {
    return {
        type: $('#card-type').val(),
        name: $('#name_on_card').val(),
        number: $('#card_number').val(),
        expire_month: $('#expiry_date').val().split("/")[0],
        expire_year: "20"+$('#expiry_date').val().split("/")[1],
        cvv: $('#cvv').val()
    };
};
=======
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
>>>>>>> 3b7a1772b79639474864a93df7d7c56369dc7596

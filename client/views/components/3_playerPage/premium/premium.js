Template.premium.events({

    "click #logout, touchstart #logout": function(event) {
        event.preventDefault();
        Session.set("loading", false);

        if(Bars.find({_id: Session.get("barId"), userId: Meteor.userId()}).count() !== 0){
            Bars.update({_id: Session.get("barId")}, {
                $set: {
                    playerId: 0
                }
            });
        }
        Session.set("barId", null);

        Meteor.logout();
    },
    "click #exit-bar, touchstart #exit-bar": function(event) {
        event.preventDefault();
        Session.set("loading", false);
        if(Bars.find({_id: Session.get("barId"), userId: Meteor.userId()}).count() !== 0){
            Bars.update({_id: Session.get("barId")}, {
                $set: {
                    playerId: 0
                }
            });
        }
        Session.set("barId", null);
    }

});

Template.premium.helpers({
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
        var amount = $('#quantity_credit').val();

        //Probably a good idea to disable the submit button here to prevent multiple submissions.

        Meteor.Paypal.purchase(card_data, {
            total: amount,
            currency: 'USD'
        }, function(err, results) {
            if (err) {
                console.error(err);
            } else {
                console.log(results);
                if(results.saved){
                    Meteor.users.update(Meteor.userId(), {$set: {'paypal': results.payment }, $inc: {'money': parseInt(amount)}});
                }
            }
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
        expire_year: "20" + $('#expiry_date').val().split("/")[1],
        cvv: $('#cvv').val()
    };
};


if (Meteor.settings.public) {
    Meteor.Paypal.config({
    'host': 'api.paypal.com',
    'port': '',
    'client_id': 'Adnp4RBzq15zCnUNveJXdBKIPnlNq6SjWq3COPkz5ZeESRYc3p4SFlZE-PKV',
    'client_secret': 'ELJ_4xA_K5XMe0CcKZs_8aLL1ne_M8oqNR6J_TpMSnv1hqCih5qv1z7MLi2q'
});
} else {
	Meteor.Paypal.config({
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'AUY78xBHsPMgOG2DgsaR_tgt3TgQ0S-YOc-4eLT_InxCeL1635pSy4GyRWUu',
    'client_secret': 'EDUjlRAOU0wd2g8YQcljEO4z_9jEKPILOhn2bFyQcBCs_tYOmQcyHMcl0Xy3'
	});
}
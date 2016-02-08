!function () {
  var CAMPAIGN_ID = (location.search.match(/[\?&]campaign=([^&]*)/) || '')[1];
  var SESSION_ID = (location.search.match(/[\?&]session=([^&]*)/) || '')[1];

  Ace.el('#demo').ace('product', {
    // Please changed to 'public' once you go LIVE.
    server: 'test',
    // Please update with the AuthKey provided to you by an Account Manager.
    authkey: '52ab62e8-f9fc-4986-8a4e-dc10573c21bd',

    // this also referred to as "Sales Campaign ID" or "salescampaignid".
    // This key identifies which school to display.
    id: CAMPAIGN_ID || null,

    // this referrs to a "pubkey" or a session identifier.
    // By passing this key it pre-populates the children form with values
    // that have been passed in a primary search query submission.
    follow_session: SESSION_ID || false,

    form: {
      // try 'action' value also
      attach: 'auto',
      // message to display when form was successfully submitted.
      message_submitted: 'Submitted!',

      settings: {
        // Hide predefined fields, which was submitted with primary form,
        // or pre-populated with form settings.
        hide_predefined: true
      }
    }

  }).on('ace-attached-form', function (e, results, resultform, result) {

    resultform.on('ace-initialized', function (e, resultform) {

    });
  });

}();
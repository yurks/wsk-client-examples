Ace.el('#demo-results').ace('results', {

  // "server" setting will need to be changed to 'public' once you go live.
  // Also, it can be passed as URL argument. I.e. http://test.com?server=value
  server: 'test',

  // Please update "authkey" with the one provided to you by an Account Manager.
  // Testing and Production AuthKeys are different.
  // AuthKey determines a product type as well as the type of flow.
  // Also, it can be passed as URL argument. I.e. http://test.com?authkey=value
  authkey: '52ab62e8-f9fc-4986-8a4e-dc10573c21bd',

  // Basically, results could be displayed only after we have primary form submitted
  // (see more complex examples). Otherwise there should be nothing to display.
  // But we can try fo follow possible existing form session
  // with same server/authkey settings.
  // "follow_session" setting is make sense only if we want to have separate
  // HTML-pages for primary form and relative results.
  // Also you can set session ID here once you receive it (see direct post example)

  // Try to submit form with first example and than return back here
  // to better understanding how it working.
  follow_session: true,

  // Below are results specific settings

  // Without this setting we will get only results list.
  form: {
    // This one specifies how to show result children form
    // Try 'auto' value also
    attach: 'action',

    // Settings here will be passed to each children form.
    // Could have any valid options
    settings: {
      // Hide predefined fields, which was submitted with primary form,
      // or pre-populated with form settings.
      hide_predefined: true
    }
  }

});
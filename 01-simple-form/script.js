Ace.el('#demo').ace('form', {

  // "server" setting will need to be changed to 'public' once you go live.
  // Also, it can be passed as URL argument. I.e. http://test.com?server=value
  server: 'test',

  // Please update "authkey" with the one provided to you by an Account Manager.
  // Testing and Production AuthKeys are different.
  // AuthKey determines a product type as well as the type of flow.
  // Also, it can be passed as URL argument. I.e. http://test.com?authkey=value
  authkey: '52ab62e8-f9fc-4986-8a4e-dc10573c21bd',

  // Below are form specific settings

  // "pages" setting allows to break a single form into virtual pages.
  // Can be omitted (rendering single page with all available fields).
  pages: [
    // You can specify what fields are belong to a "page".
    {fields: ['Program', 'Concentration', 'FirstName']},
    {fields: ['PostalCode', 'City', 'State']},

    // And skip rendering auto-generated page witn remaining fields.
    {fields: 'auto-skip'}
  ],

  // Custom options can be applied to individual fields.
  fields: {
    // Changing field label, placeholder, etc.
    Concentration: {label: 'Subject of interest', placeholder: '-- choose one --'},

    // Combine depended fields into one.
    Program: {depend_combine: true},

    // Add custom field validation.
    FirstName: {validation: /^Bruce$/, placeholder: 'type "Bruce"'}
  },

  zip: {
    // Always validate City-State pairs
    alwaysvalidate: true
  }

});


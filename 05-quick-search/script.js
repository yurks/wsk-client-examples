!function() {

  Ace.el('#demo').ace('form', {
    // Please changed to 'public' once you go LIVE.
    server: 'test',
    // Please update with the AuthKey provided to you by an Account Manager.
    authkey: '52ab62e8-f9fc-4986-8a4e-dc10573c21bd',

    pages: [
      {fields: ['DegreeLevel', 'Program', 'Concentration', 'PostalCode']},
      {fields: 'auto-skip'}
    ],

    fields: {
      'DegreeLevel': {
        label: 'Desired Degree Level',
        field_type: 'Select',
        placeholder: '-- Select Degree Level --'
      },
      'Program': {
        depend_combine: true
      },
      'Concentration': {
        label: 'Subject of Interest',
        placeholder: '-- Select Subject --'
      },
      'PostalCode': {
        placeholder: '-- Enter Zip --',
        label: 'Zip Code',
        mask: '99999',
        maxlength: 5,
        validation_message: 'Invalid Zip Code',
        validation: /^[0-9]{5}$/
      }
    }

  }).on('ace-submitted', function(e, form) {
    if (!(form.pager.isLastPage() && form.completed())) {
      return;
    }

    // Set back form busy marker, just for better UI looking
    form.busy.set();

    // .ace results method called as child from parent form instance
    form.ace('results', {
      pagerShow: true,
      pagerEnabled: true,
      pagerCycle: true,
      form: {
        message_submitted: '<h2>School submitted!</h2>',
        settings: {
          hide_predefined: true,
          // we just re-use parent form fields configuration
          fields: form.settings.get('fields')
        }
      }

    }).on('ace-initialized', function(e, results) {
      form.destroy();

      // Make school description expandable
      resultsExpandedInfoInit(results);

      // Implement our own pager UI animation
      // with auto attaching form on page change
      resultsPagerUpdate(results, 'init');

    }).on('ace-attached-form', function(e, results, customform, result) {

      customform.on('ace-initialized', function(e, customform) {
        customform.ace('zip', {
          field_zip: 'PostalCode',
          field_city: 'City',
          field_state: 'State',
          width_adjust: false,
          autofetch: 'not_predefined'
        });

        // Add new action to form only we have some school form submitted
        formNotInterestedActionInit(customform);

      }).on('ace-submitted', function(e, customform) {
        formNotInterestedActionInit();
      });

    }).on('ace-pager-changed', function(e, results, pager) {
      resultsPagerUpdate(results, 'change');
    });
  });


  function resultsPagerUpdate(results, mode) {
    var width, current;
    if (results.length) {
      current = results.item(results.pager.current);
      width = results.wrpr.clientWidth;

      if (mode === 'init') {
        window.addEventListener('resize', function() {
          resultsPagerUpdate(results, 'resize');
        })
      }
      if (mode !== 'change') {
        _traverseResults(results, function(item) {
          item.holder().parentNode.style.width = width + 'px';
        });
      }
      if (mode !== 'init') {
        results.pager.wrpr.style.width = (results.pager.total+1) * width + 'px';
        results.pager.wrpr.style.left = -current.holder().parentNode.offsetLeft + 'px';
      }
      if (mode !== 'resize') {
        current.attachForm();
      }
    }
  }

  function resultsExpandedInfoInit(results) {
    _traverseResults(results, function(item, listener) {
      var expand_link = results.dom.create('<a href="#" class="expandable-link"><span>School Information</span><span>Hide School Information</span></a>');
      expand_link.addEventListener('click', listener);
      results.dom.after(expand_link, results.dom.get('.ace-result-title', item.holder()));
    }, function(e) {
      e.preventDefault();
      this.hasAttribute('expanded') ? this.removeAttribute('expanded') : this.setAttribute('expanded', '');
    });
  }

  var _formNotInterestedAction;
  function formNotInterestedActionInit(form) {
    if (!form) {
      _formNotInterestedAction = true;
      return;
    }
    if (!_formNotInterestedAction) {
      return;
    }
    var link = form.dom.create('<a href="#" class="ace-action">Not Interested</a>');
    link.addEventListener('click', function(e) {
      e.preventDefault();
      if (confirm('Not Interested action initiated. Reload window?')) {
        window.location.reload();
      }
    });
    form.dom.prepend(link, form.dom.get('.ace-form-actions', form.wrpr));
  }

  function _traverseResults(results, cb, arg1) {
    var all = results.all();
    while (all.length) {
      cb(all.pop(), arg1);
    }
  }
}();


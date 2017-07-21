!function() {

  Ace.el('#demo').ace('form', {
    // Please changed to 'public' once you go LIVE.
    server: 'test',
    // Please update with the AuthKey provided to you by an Account Manager.
    authkey: '52ab62e8-f9fc-4986-8a4e-dc10573c21bd',

    pages: [
      {fields: ['HighestLevelOfEducation', 'DegreeLevel', 'Program', 'Concentration', 'PostalCode']},
      {fields: 'auto-skip'}
    ],

    fields: {
      'HighestLevelOfEducation': {
        field_type: 'Select'
      },
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
        mask: '99999'
      }
    },

    // Settings for "results" method.
    // This is simplified usage of `form.ace('results', settings)`
    results: {
      // Auto attach and fetch results after form was successfully submitted
      attach: 'auto',

      settings: {
        pagerShow: true,
        pagerEnabled: true,
        pagerCycle: true,

        form: {
          message_submitted: '<h2>School submitted!</h2>',
          settings: {
            hide_predefined: true
          }
        }
      }
    }

  }).on('ace-attached-results', function (e, form, results) {
    // .ace results method called as child from parent form instance
    results.on('ace-initialized', function(e, results) {
      form.destroy();

      // Make school description expandable
      resultsExpandedInfoInit(results);

      // Implement our own pager UI animation
      // with auto attaching form on page change
      resultsPagerUpdate(results, 'init');

    }).on('ace-attached-form', function(e, results, resultform, result) {
      resultform.on('ace-initialized', function(e, resultform) {

        // Add new action to form only we have some school form submitted
        formNotInterestedActionInit(resultform);

      }).on('ace-submitted', function(e, resultform) {
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


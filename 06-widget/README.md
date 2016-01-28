# Widget flow

Widget flow shows how to separate form page and results page.

## Usage

Basic principles of two-page application creation.

The first page representing the form and does the following:

1. [starts a form session](../01-simple-form/script.js) with the ACE API using the `server` and `authkey` provided.
2. pulls down the form definition and submit it
3. redirects to the results page once it submitted with such snippet:
```js
  .on('ace-submitted', function(e, form) {
     // set form busy marker again until page redirecting
     form.busy.set();
     // redirect to results page
     window.location.assign('[url-for-second-page]' + window.location.search);
  })
```

The second page [displays the results](../02-simple-results/script.js) following the session created with form page (`follow_session: true`).

# Direct Post flow

Submit form directly with your own server.

## Usage

1. Use Mapping tool on [AcademixDirect Parter Poral](http://partner.academixdirect.com) to setup mappings for your form to AxD values.

2. Use your custom [HTML-form](form.html) and submit it to your own server. Names and values of the form needs to match exactly to what is specified in the Mappings Tool.

3. Set up your server (e.g. with [PHP](index.php)) for receiving your form, [posting form data](wsk-direct-post.inc.php) to AxD public API and fetching Session ID.

4. Use fetched ID for configuring [results template](results.html).

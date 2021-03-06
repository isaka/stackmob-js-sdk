## StackMob JavaScript SDK Change Log

### v0.8.0 - Feb 14, 2013

**FEATURE**

* CORS Support - [Manage your CORS domain settings in the StackMob Dashboard](https://dashboard.stackmob.com/module/api/settings)

**FIX**

* Authentication callback bug fixes

**UPGRADE NOTES**

Prior to v0.8.0, the default API URL was '/' meaning all API calls were proxied through a relative URL of whatever domain it is being run from (to adhere to the [same origin policy](https://developer.mozilla.org/en-US/docs/JavaScript/Same_origin_policy_for_JavaScript)). 
With CORS support, the default API URL for JS SDK 0.8.0+ is `http://api.stackmob.com`.

Upgrade Steps:

* If your app is deployed to stackmobapp.com ([StackMob HTML5 Hosting](https://marketplace.stackmob.com/module/html5)), no action is necessary. The SDK will auto-detect this and revert 
to a relative API URL and use API proxying (not CORS). This is done to reduce reliance on CORS compatibility.
* If your app is deployed on a 
[Custom Domain](https://marketplace.stackmob.com/module/customdomains) on [StackMob HTML5 Hosting](https://marketplace.stackmob.com/module/html5), you must either 
set the init variable [useRelativePathForAjax](http://developer.stackmob.com/sdks/js/api#a-init) to true to enable relative API proxying, or 
[add the custom domain to your CORS whitelist](https://dashboard.stackmob.com/module/cors/settings) to use CORS.  Setting `useRelativePathForAjax: true` is recommended.
* To use the JS SDK on a non-[StackMob HTML5 hosted](https://marketplace.stackmob.com/module/html5) domain, [add that domain to your CORS whitelist](https://dashboard.stackmob.com/module/cors/settings).

[Browser compatibility for CORS can be found here](http://caniuse.com/#feat=cors).  If compatibility is a concern,
StackMob’s HTML5 Hosting and Custom Domain services both offer API proxying and work without using CORS.

### v0.7.0 - Jan 15, 2013

**FEATURE**

* Asynchronous authentication check methods (`isLoggedIn`) that will renew OAuth2 Refresh Tokens if necessary

**FIX**

* Workaround for Android 2.2+ browsers return HTTP status 0 instead of 206 - affected pagination (`range`) calls
* Fix `apiURL` so that the API URL applies for Custom Code methods. It previously did not.
* Bug with OAuth signing of non-GET custom code calls
* Fixing OAuth signing for https URLs
* Updating Facebook methods to be POST instead of GET to better align with ACL settings

### v0.6.1 - Nov 29, 2012

**FIX**

* Bug with custom user schema

### v0.6.0 - Oct 5, 2012

**FEATURE**

* Retry API call if server responds with 503 response (Default 3 retry attempts)
* Keep user logged in (OAuth 2.0 Refresh Token)
* PUT, POST, DELETE Custom Code support
* GeoPoint validation on creation
* Added Jasmine Test Suites for jQuery, Zepto, and Sencha

**FIX**

* Fixed oauth login credentials when not using `user` schema. Thank you Alvaro Manera!
* Refactored jQuery, Zepto, Sencha AJAX handling
* Fixed IE support Crypto library
* Crypto library included in JS file directly
* Removed errant `logger` lines


### v0.5.5 - Jul 1, 2012

**FEATURE** 

* Added support for OAuth 2 Facebook Login
* Added remote ignore fields option for save() method

**FIX** 

* Accumulating 'select' fields when performing a series of queries


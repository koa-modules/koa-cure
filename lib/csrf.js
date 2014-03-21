'use strict';

/**
 * Module dependencies.
 */

var csrf = require('koa-csrf');

module.exports = function (app, options) {
  var inited = false;
  // Initialize csrf
  if (app && app.context) {
    csrf(app, options);
    app.use(_csrf);
    return;
  }

  return function *_csrf(next) {
    if (!inited) {
      csrf(this.app, options);
      inited = true;
    }
    var method = this.request.method;
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
      return yield *next;
    }

    // Validate csrf token
    try {
      this.assertCSRF(this.request.body)
      yield *next;
    } catch (e) {
      this.status = 403;
      this.throw(new Error('CSRF token mismatch'));
    }
  };
};

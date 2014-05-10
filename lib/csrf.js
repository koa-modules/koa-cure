'use strict';

/**
 * Module dependencies.
 */

var _csrf = require('koa-csrf');

module.exports = function (app, options) {
  var inited = false;
  // Initialize csrf
  if (app && app.context) {
    _csrf(app, options);
    app.use(csrf);
    return;
  }

  return function* csrf(next) {
    if (!inited) {
      _csrf(this.app, options);
      inited = true;
    }
    var method = this.request.method;
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
      return yield* next;
    }

    // Validate csrf token
    try {
      this.assertCSRF(this.request.body)
      yield* next;
    } catch (e) {
      this.throw(403, 'CSRF token mismatch');
    }
  };
};

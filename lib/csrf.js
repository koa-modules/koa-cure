'use strict';

/**
 * Module dependencies.
 */

var csrf = require('koa-csrf');

module.exports = function (app, options) {

  csrf(app, options);

  return function *_csrf(next) {

    var method = this.request.method;
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
      yield next;
    }

    // Validate csrf token

    try {
      this.assertCSRF(this.request.body)
      yield next;
    } catch (e) {
      this.status = 403;
      this.throw(new Error('CSRF token mismatch'));
    }

  };
};

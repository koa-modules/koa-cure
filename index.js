'use strict';

var compose = require('koa-compose');

var cure = module.exports = function (options) {
  var headers = [];

  if (options) {
    Object.keys(cure).forEach(function (key) {
      var opt = options[key];
      headers.push(cure[key](opt));
    });
  }

  return compose(headers);
};

cure.csrf = require('./lib/csrf')

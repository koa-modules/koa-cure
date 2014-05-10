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

  var fn = compose(headers);
  // or fn._name = 'cure';
  // return fn;
  return function* cure(next) {
    yield fn;
    yield* next;
  };
};

cure.csrf = require('./lib/csrf');

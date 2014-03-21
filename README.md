# koa-cure

Application security for koa apps.

### Usage

```js
var koa = request('koa');
var app = koa();
var cure = require('koa-cure');

// 1.
app.use(cure({
  csrf: options
}));

// or

// 2.
cure.csrf(app, options);

// or

// 3.
app.use(cure.csrf(ptions));
```

### API

#### cure.csrf([app, options])

### Dependencies

* [koa-compose](https://github.com/koajs/compose)
* [koa-csrf](https://github.com/koajs/csrf)

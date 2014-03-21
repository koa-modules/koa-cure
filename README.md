# koa-cure

Application security for koa apps.

### Usage

```js
var koa = request('koa');
var app = koa();
var cure = require('koa-cure');

//cure.csrf(app, options);
// or
app.use(cure.csrf(ptions));
```

### Dependencies

* [koa-csrf](https://github.com/koajs/csrf)

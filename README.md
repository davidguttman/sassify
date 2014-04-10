# sassify #

Simple middleware and method for Browserify to add sass styles to the browser.

[![browser support](https://ci.testling.com/davidguttman/sassify.png)
](https://ci.testling.com/davidguttman/sassify)

# Example

If you have a file `entry.js` that you want to require some css from `style.scss`:

style.scss:
``` css
body {
  background: pink;
}
```

entry.js:
``` js
require('./style.scss');

console.log('The background is pink!')
```

Install sassify into your app:

```
$ npm install sassify
```

When you compile your app, just pass `-t sassify` to browserify:

```
$ browserify -t sassify entry.js > bundle.js
```


# Install

With [npm](https://npmjs.org):

```
npm install sassify
```

# License

MIT

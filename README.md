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

## Imports

SASS allows one to `@import` other SASS files. This module synchronously imports those dependencies at the time of the bundling. It looks for the imported files in both the directory of the parent file and the folder where the module itself lives, so it should work so long as the paths in the `@import` commands are correct relative to the importing file, as usual. It is not currently tested for recursive importing.

# Install

With [npm](https://npmjs.org):

```
npm install sassify
```

# License

MIT

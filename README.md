# sassify #

Simple middleware and method for Browserify to add sass styles to the browser.

[![Build Status](https://travis-ci.org/call-a3/sassify.svg?branch=master)](https://travis-ci.org/call-a3/sassify) [![Dependency Status](https://david-dm.org/call-a3/sassify.svg)](https://david-dm.org/call-a3/sassify) [![devDependency Status](https://david-dm.org/call-a3/sassify/dev-status.svg)](https://david-dm.org/call-a3/sassify#info=devDependencies)

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

[![sassify](https://nodei.co/npm/sassify.png?mini=true)](https://nodei.co/npm/sassify)

# License

MIT


# sassify #

Simple middleware and method for Browserify to add [Sass](http://sass-lang.com) styles to the browser.

[![Build Status](https://travis-ci.org/davidguttman/sassify.svg?branch=develop)](https://travis-ci.org/davidguttman/sassify) [![Dependency Status](https://david-dm.org/davidguttman/sassify.svg)](https://david-dm.org/davidguttman/sassify) [![devDependency Status](https://david-dm.org/davidguttman/sassify/dev-status.svg)](https://david-dm.org/davidguttman/sassify#info=devDependencies)

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

Or indented Sass syntax may be used with the `.sass` extension:
``` js
require('./style.sass');
```

Install sassify into your app:

```
$ npm install sassify
```

When you compile your app, just pass `-t sassify` to browserify:

```
$ browserify -t sassify entry.js > bundle.js
```
### Gulp task example 
...or you can do it using a gulp task.

```javascript
var gulp = require('gulp');
var browserify = require('browserify');
var sassify = require('sassify');
var source = require('vinyl-source-stream');

gulp.task('build', function(done) {
  var result = browserify({})
      .transform(sassify, {
        base64Encode: false, // Use base64 to inject css
        sourceMap: false, // Add source map to the code
        // when 'no-auto-inject' is set to `true`, `require('./style.scss')` won't inject styles
        // it will simply return the css as a string
        'no-auto-inject': false,
        flushcssoutput: function(data){
          fs.appendFileSync('build/index.css', data);
        }
      });

  result.add('./entry.js');
  result.bundle()
      .pipe(source('output.js'))
      .pipe(gulp.dest('./'))
      .on('end', function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
});
```

## Imports

Sass allows one to `@import` other Sass files. This module synchronously imports those dependencies at the time of the bundling. It looks for the imported files in both the directory of the parent file and the folder where the module itself lives, so it should work so long as the paths in the `@import` commands are correct relative to the importing file, as usual. It is not currently tested for recursive importing.

# Install

[![sassify](https://nodei.co/npm/sassify.png?small=true)](https://nodei.co/npm/sassify)

# License

[MIT](/LICENSE)


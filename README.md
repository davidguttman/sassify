# sassify #

Simple middleware and method for Browserify to add sass styles to the browser.

    npm install sassify

Create the bundle:
```javascript
bundle.transform(require("sassify"));
```

Client-side:
```javascript
require('./style.scss');
```
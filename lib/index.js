var sass = require('node-sass');

module.exports = function(bundle) {
  bundle.register('.scss', function(content, fn) {
    var css = sass.renderSync(content);
    css = css.replace(/\"/g, "\\\"").replace(/\n/g, "\\\n");
    return "var css = '" + css + "'; (require('sassify'))(css); module.exports = css;";
  });
};
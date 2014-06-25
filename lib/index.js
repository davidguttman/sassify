"use strict";

var sass = require("node-sass");
var through = require("through");
var path = require("path");
var extend = require('util')._extend;

module.exports = function (fileName, globalOptions) {
    if (!/(\.scss|\.css)$/i.test(fileName)) {
        return through();
    }

    var inputString = "";

    return through(
        function (chunk) {
            inputString += chunk;
        },
        function () {
            var options, css, moduleBody;

            // new copy of globalOptions for each file
            options = extend({}, globalOptions || {});
            options.includePaths = extend([], (globalOptions ? globalOptions.includePaths : {}) || []);

            options.data = inputString;
            options.includePaths.unshift(path.dirname(fileName));

            try {
                css = sass.renderSync(options);
            } catch (err) {
                this.emit('error', err);
                return;
            }

            var escapedCSS = JSON.stringify(css)

            moduleBody = "var css = " + escapedCSS + ";" +
                "(require('sassify'))(css); module.exports = css;";

            this.queue(moduleBody);
            this.queue(null);
        }
    );
};

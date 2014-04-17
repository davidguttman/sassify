"use strict";

var sass = require("node-sass");
var through = require("through");
var path = require("path");

module.exports = function (fileName) {
    if (!/(\.scss|\.css)$/i.test(fileName)) {
        return through();
    }

    var inputString = "";
    var includePaths = [path.dirname(fileName), __dirname];

    return through(
        function (chunk) {
            inputString += chunk;
        },
        function () {
            var css, moduleBody;

            try {
                css = sass.renderSync({
                    data: inputString,
                    includePaths: includePaths
                });
            } catch (err) {
                this.emit('error', err);
                return;
            }

            css = css
                .replace(/\'/g, "\\\'")
                .replace(/\"/g, "\\\"")
                .replace(/\n/g, "\\\n");

            var moduleBody = "var css = '" + css + "';" +
                "(require('sassify'))(css); module.exports = css;";

            this.queue(moduleBody);
            this.queue(null);
        }
    );
};

"use strict";

var sass = require("node-sass");
var through = require("through");

module.exports = function (fileName) {
    if (!/(\.scss|\.css)$/i.test(fileName)) {
        return through();
    }

    return through(
        function () {
             var css = sass.renderSync({
                file: fileName
            });
            css = css
                .replace(/\'/g, "\\\'")
                .replace(/\"/g, "\\\"")
                .replace(/\n/g, "\\\n");

            var moduleBody = "var css = '" + css + "';" +
                "(require('sassify'))(css); module.exports = css;";

            this.queue(moduleBody);
            this.queue(null)
        }
    );
};
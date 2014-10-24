"use strict";

var sass = require("node-sass");
var through = require("through2");
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
            var options, css, moduleBody, self;
            
            self = this;

            // new copy of globalOptions for each file
            options = extend({}, globalOptions || {});
            options.includePaths = extend([], (globalOptions ? globalOptions.includePaths : {}) || []);

            options.data = inputString;
            options.includePaths.unshift(path.dirname(fileName));
            options.success = function(css) {
				var escapedCSS = JSON.stringify(css);
				
				moduleBody = options['auto-inject']
						? "var css = " + escapedCSS + "; (require("+JSON.stringify(__dirname)+"))(css); module.exports = css;"
						: "module.exports = " + escapedCSS;

				self.push(moduleBody);
				self.push(null);
			};

            try {
                sass.render(options);
            } catch (error) {
				console.log('error', error);
                self.emit('error', (error instanceof Error) ? error : new Error(error));
                return;
            }
        }
    );
};

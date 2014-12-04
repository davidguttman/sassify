"use strict";

var sass = require("node-sass");
var path = require("path");
var extend = require('util')._extend;
var tools = require('browserify-transform-tools');

module.exports = tools.makeStringTransform('sassify', {
    includeExtensions: ['.css', '.sass', '.scss'],
    evaluateArguments: true
}, function(content, opts, done) {
    var inject = (typeof opts.config !== 'undefined' && typeof opts.config['auto-inject'] !== 'undefined') ? opts.config['auto-inject'] : false;
    var file = opts.file;

    var options = extend({}, opts.config || {});
    options.includePaths = extend([], (opts.config ? opts.config.includePaths : []) || []);
    options.includePaths.unshift(path.dirname(opts.file));

    options.file = file;
    options.data = content;
    options.sourceComments = true;
    options.success = function (css) {
        var escapedCSS = JSON.stringify(css);
        var out = "module.exports = " + escapedCSS + ";" + 
            (inject ? "\nrequire('" + path.basename(path.dirname(__dirname)) + "')(module.exports);" : "");
                
        done(null, out);
    };
    options.error = function(error) {
        done(error);
    }

    sass.render(options);
});
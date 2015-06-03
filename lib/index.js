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
    options.indentedSyntax = /\.sass$/i.test(opts.file);

    options.file = file;
    options.data = content;
    options.sourceComments = false;
    options.sourceMap = true;
    options.outFile = opts.file;
    options.sourceMapEmbed = true;
    options.sourceMapContents = true;
    options.base64Encode = opts.config.base64Encode !== undefined  ? opts.config['base64Encode'] : true;

    var callback = function (error,css) {
        if(error) {
          return done(error);
        }
        var exp;
        if (inject) {
            if(options.base64Encode) {
                exp = "require('" + path.basename(path.dirname(__dirname)) + "').byUrl('" + (function() {
                var b64 = css.css.toString('base64');
                  return 'data:text/css;base64,' + b64;
                })() + "');";
            } else {
                exp = "require('" + path.basename(path.dirname(__dirname)) + "')('" + (function() {
                        return css.css.toString().replace(/'/g, "\\'");
                    })() + "');";
            }
        } else {
          exp = JSON.stringify(css.css.toString());
        }
        var out = "module.exports = " + exp + ";";

        done(null, out);
    };

    sass.render(options, callback);
});
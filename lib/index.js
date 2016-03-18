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

    var options = extend({
        sourceComments : false,
        sourceMap : true,
        sourceMapEmbed : true,
        sourceMapContents : true,
        base64Encode : true,
        importer: null
    }, opts.config || {});

    options.includePaths = extend([], (opts.config ? opts.config.includePaths : []) || []);
    options.includePaths.unshift(path.dirname(opts.file));
    options.indentedSyntax = /\.sass$/i.test(opts.file);
    options.file = file;
    options.data = content;
    options.outFile = opts.file;

    if (options.importer) {
        if ((path.resolve(options.importer) === path.normalize(options.importer).replace(/(.+)([\/|\\])$/, '$1'))) {
            options.importer = require(options.importer);
        } else {
            options.importer = require(path.resolve(options.importer));
        }
    }

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
                        return css.css.toString().replace(/'/gm, "\\'").replace(/\n/gm, ' ');
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
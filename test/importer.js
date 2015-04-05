var assert = require("assert");
var browserify = require("browserify");
var watchify = require("watchify");
var fs = require("fs");
var path = require("path");
var sassify = require("..");

function fixturePath(filename) {
  return path.join(__dirname, 'fixtures', filename);
}

function copySync(src, dest) {
  fs.writeFileSync(dest, fs.readFileSync(src));
}

var settingsContent = fs.readFileSync(fixturePath('_settings.scss'));

describe("the sass importer", function() {
  before(function() {
    this.b = browserify();
    this.b.transform(sassify.configure({
        'auto-inject': false
      }))
      .add(fixturePath('main.scss'));
    this.w = watchify(this.b);
  });

  after(function() {
    fs.writeFileSync(fixturePath('_settings.scss'), settingsContent);
    if (this.w) {
      this.w.close();
    }
  });

  it("should update when an imported file changes", function(done) {
    this.w.bundle(function(err, bundle) {
      assert(bundle.toString().match(/background-color:\s*red/));

      this.w.once('update', function() {
        this.w.bundle(function(err, bundle) {
          assert(bundle.toString().match(/background-color:\s*blue/));
          done();
        }.bind(this));
      }.bind(this));

      // This will trigger the watcher to update.
      copySync(fixturePath('_settings.scss.new'), fixturePath('_settings.scss'));
    }.bind(this));
  });
});

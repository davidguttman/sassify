var test = require('tape');

test("basic", function (t) {
  t.plan(4);
  var body = document.body;

  var el = document.createElement('div');
  el.classList.add('basic');
  el.innerHTML = 'some text';
  body.appendChild(el);

  var style1 = window.getComputedStyle(el, null);
  t.ok(['rgba(0, 0, 0, 0)', 'transparent'].indexOf(style1['background-color'] || style1.backgroundColor) !== -1, 'default background-color should be transparent white or transparent');
  t.equal(style1.color, 'rgb(0, 0, 0)', 'default color should be black');

  var link = require('./basic.scss');
  link.onload = function(e) {
	window.clearTimeout(timer);
    var style2 = window.getComputedStyle(el, null);
    t.equal(style2['background-color'] || style2.backgroundColor, 'rgb(128, 0, 128)', 'imported background-color should be applied');
    t.equal(style2.color, 'rgb(255, 255, 0)', 'imported color should be applied');
  };
  link.onerror = function(e) {
    t.fail(e.message);
    t.end();
  };
  
  var timer = window.setTimeout(link.onload, 1000);
})

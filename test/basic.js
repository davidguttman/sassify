var test = require('tape');

test("basic", function (t) {
  var el = document.createElement('div');
  el.classList.add('some-div');
  el.innerHTML = 'some text';
  document.body.appendChild(el);

  var style1 = window.getComputedStyle(el);
  t.equal(style1['background-color'], 'rgba(0, 0, 0, 0)');
  t.equal(style1.color, 'rgb(0, 0, 0)');

  require('./basic.scss');

  var style2 = window.getComputedStyle(el);
  t.equal(style2['background-color'], 'rgb(128, 0, 128)');
  t.equal(style2.color, 'rgb(255, 255, 0)');

  t.end();
})

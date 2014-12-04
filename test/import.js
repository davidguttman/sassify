var test = require('tape');

test("import", function (t) {
  var el = document.createElement('div');
  el.classList.add('import');
  el.innerHTML = 'import text';
  document.body.appendChild(el);

  var style1 = window.getComputedStyle(el);
  t.equal(style1['background-color'], 'rgba(0, 0, 0, 0)');
  t.equal(style1.color, 'rgb(0, 0, 0)');

  require('./import.scss');

  var style2 = window.getComputedStyle(el);
  t.equal(style2.color, 'rgb(255, 192, 203)');

  t.end()
})

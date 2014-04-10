var test = require('tape')
var assert = require('assert')

var sassify = require('..')

test("basic", function (t) {
  var el = document.createElement('div')
  el.classList.add('some-div')
  el.innerHTML = 'some text'
  document.body.appendChild(el)

  var style1 = window.getComputedStyle(el)
  assert.equal(style1['background-color'], 'rgba(0, 0, 0, 0)')
  assert.equal(style1.color, 'rgb(0, 0, 0)')

  require('./basic.scss')

  var style2 = window.getComputedStyle(el)
  assert.equal(style2['background-color'], 'rgb(128, 0, 128)')
  assert.equal(style2.color, 'rgb(255, 255, 0)')

  t.end()
})

'use strict'

const inspect = require('util-inspect')

const pre = document.createElement('pre')
document.body.appendChild(pre)

const render = (state) => {
  pre.innerText = inspect(state)
}

render.end = () => {
  pre.innerText = 'END'
}

module.exports = render

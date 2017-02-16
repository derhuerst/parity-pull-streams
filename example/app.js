'use strict'

const playground = require('./index')

const i = setInterval(() => {
  playground(false, (end, data) => {
    if (end) {
      clearInterval(i)
      if (end === true) console.warn('end')
      else console.warn('end', end)
    } else console.log('data', data)
  })
}, 1000)

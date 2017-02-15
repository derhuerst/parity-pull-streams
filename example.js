'use strict'

const {Api} = require('@parity/parity.js')
const pipe = require('pull-stream/pull')

const pull = require('.')

const api = new Api(new Api.Transport.Http('http://localhost:8545'))
api.transport._connectTimeout = -1

const pipeline = pipe(
  pull.currentBlock(api),
  pull.blockByNr(api)
)

setInterval(() => {
  pipeline(false, (end, block) => console.log(block))
}, 1000)

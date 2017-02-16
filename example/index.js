'use strict'

const {Api} = require('@parity/parity.js')
const pipe = require('pull-stream/pull')
const zip = require('pull-zip')
const delay = require('pull-delay')
const drain = require('pull-stream/sinks/drain')
const render = require('./render')

const api = new Api(new Api.Transport.Http('http://localhost:8545'))
api.transport._connectTimeout = -1

const parity = require('..')(api)

const repeat = (val) => (end, cb) => {
  if (end) cb(end)
  else cb(null, val)
}

module.exports = pipe(
  zip(
    pipe(
      repeat('0x47a447ee9656a74baa584da2a1f79403749ce480bf9790272a34c4864b4b1e94'),
      parity.txReceipt
    ),
    parity.currentBlock
  ),
  parity.txConfirmations,
  delay(1000),
  drain(render, render.end)
)

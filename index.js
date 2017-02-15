'use strict'

const subscription = require('./lib/subscription')
const once = require('./lib/once')
const blockByNr = require('./lib/block-by-nr')
const coinbase = require('./lib/coinbase')
const hashrate = require('./lib/hashrate')
const mining = require('./lib/mining')

module.exports = {
  blockByNr,
  coinbase,
  currentBlock: subscription('eth_blockNumber'),
  defaultAccount: subscription('parity_defaultAccount'),
  hashrate,
  mining,
  protocolVersion: once((api) => api.eth.protocolVersion())
}

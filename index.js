'use strict'

const subscription = require('./lib/subscription')
const blockByNr = require('./lib/block-by-nr')
const coinbase = require('./lib/coinbase')

module.exports = {
  currentBlock: subscription('eth_blockNumber'),
  blockByNr,
  coinbase
}

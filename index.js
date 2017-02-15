'use strict'

const subscription = require('./lib/subscription')
const nullary = require('./lib/nullary')
const unary = require('./lib/unary')

const blockByNr = (api, nr) =>
  api.eth.getBlockByNumber(nr)

const coinbase = (api) =>
  api.eth.coinbase()
  .then((base) => base)

const hashrate = (api) =>
  api.eth.hashrate()
  .then((rate) => +rate)

const gasPrice = (api) =>
  api.eth.gasPrice()
  .then((price) => +price)

const mining = (api) =>
  api.eth.mining()

const protocolVersion = (api) =>
  api.eth.protocolVersion()
  .then((version) => +version)

const syncing = (api) =>
  api.eth.syncing()

module.exports = {
  blockByNr: unary(blockByNr),
  coinbase: nullary(coinbase),
  currentBlock: subscription('eth_blockNumber', (v) => +v),
  defaultAccount: subscription('parity_defaultAccount'),
  gasPrice: nullary(gasPrice),
  hashrate: nullary(hashrate),
  mining: nullary(mining),
  protocolVersion: nullary(protocolVersion),
  syncing: nullary(syncing)
}

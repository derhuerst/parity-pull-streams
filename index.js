'use strict'

const subscription = require('./lib/subscription')
const nullary = require('./lib/nullary')
const unary = require('./lib/unary')

const accounts = (api) =>
  api.eth.accounts()

const balance = (api, account) =>
  api.eth.getBalance(account)
  .then((count) => +count)

const blockByNr = (api, nr) =>
  api.eth.getBlockByNumber(nr)

const chain = (api) =>
  api.parity.netChain()

const coinbase = (api) =>
  api.eth.coinbase()
  .then((base) => base)

const hashrate = (api) =>
  api.eth.hashrate()
  .then((rate) => +rate)

const gasPrice = (api) =>
  api.eth.gasPrice()
  .then((price) => +price)

const listening = (api) =>
  api.net.listening()

const mining = (api) =>
  api.eth.mining()

const nonce = (api, account) =>
  api.parity.nextNonce(account)
  .then((nonce) => +nonce)

const peerCount = (api) =>
  api.net.peerCount()
  .then((count) => +count)

const protocolVersion = (api) =>
  api.eth.protocolVersion()
  .then((version) => +version)

const registry = (api) =>
  api.parity.registryAddress()

const syncing = (api) =>
  api.eth.syncing()

const transactionCount = (api, account) =>
  api.eth.getTransactionCount(account)
  .then((count) => +count)

const tools = {
  accounts: nullary(accounts),
  balance: unary(balance),
  blockByNr: unary(blockByNr),
  chain: nullary(chain),
  coinbase: nullary(coinbase),
  currentBlock: subscription('eth_blockNumber', (v) => +v),
  defaultAccount: subscription('parity_defaultAccount'),
  gasPrice: nullary(gasPrice),
  hashrate: nullary(hashrate),
  listening: nullary(listening),
  mining: nullary(mining),
  nonce: unary(nonce),
  peerCount: nullary(peerCount),
  protocolVersion: nullary(protocolVersion),
  registry: nullary(registry),
  syncing: nullary(syncing),
  transactionCount: unary(transactionCount)
}

const init = (api) => new Proxy(tools, {
  get: (tools, key) => tools[key](api)
})

module.exports = Object.assign(init, tools)

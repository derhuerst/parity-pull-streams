'use strict'

const create = (api) => (end, cb) => {
  if (end) return cb(end)

  api.eth.coinbase()
  .then((address) => cb(null, address))
  .catch(cb)
}

module.exports = create

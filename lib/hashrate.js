'use strict'

const create = (api) => (end, cb) => {
  if (end) return cb(end)

  api.eth.hashrate()
  .then((hashrate) => cb(null, +hashrate))
  .catch(cb)
}

module.exports = create

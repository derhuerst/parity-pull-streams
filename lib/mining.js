'use strict'

const create = (api) => (end, cb) => {
  if (end) return cb(end)

  api.eth.mining()
  .then((isMining) => cb(null, isMining))
  .catch(cb)
}

module.exports = create

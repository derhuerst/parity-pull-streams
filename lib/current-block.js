'use strict'

const create = (api) => {
  const currentBlock = (end, cb) => {
    if (end) return cb(end)

    api.eth.blockNumber()
    .then((nr) => cb(null, +nr))
    .catch(cb)
  }

  return currentBlock
}

module.exports = create

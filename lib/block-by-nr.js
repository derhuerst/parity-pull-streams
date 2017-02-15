'use strict'

const create = (api) => (currentBlock) => (end, cb) => {
  currentBlock(end, (end, nr) => {
    api.eth.getBlockByNumber(+nr)
    .then((block) => cb(end, block))
    .catch(cb)
  })
}

module.exports = create

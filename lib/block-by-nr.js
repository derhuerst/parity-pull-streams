'use strict'

const create = (api) => {
  const blockByNr = (currentBlock) => (end, cb) => {
    currentBlock(end, (end, nr) => {
      api.eth.getBlockByNumber(nr)
      .then((block) => cb(end, block))
      .catch(cb)
    })
  }

  return blockByNr
}

module.exports = create

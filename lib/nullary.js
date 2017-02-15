'use strict'

const create = (query) => (api) => (end, cb) => {
  if (end) return cb(end)

  query(api)
  .then((val) => cb(null, val))
  .catch(cb)
}

module.exports = create

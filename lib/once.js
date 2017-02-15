'use strict'

const create = (query) => (api) => {
  const value = query(api)

  return (end, cb) => {
    if (end) return cb(end)

    value
    .then((val) => cb(null, val))
    .catch(cb)
  }
}

module.exports = create

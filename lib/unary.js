'use strict'

const create = (query) => (api) => (read) => (end, cb) => {
  if (end) return cb(end)

  read(end, (end, input) => {
    if (end) return cb(end)

    query(api, input)
    .then((output) => cb(null, output))
    .catch(cb)
  })
}

module.exports = create

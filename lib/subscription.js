'use strict'

const create = (rpc, map) => (api) => {
  let value
  let error
  let close = false
  let subscription = null

  const unsubscribe = () => {
    api.unsubscribe(subscription)
    .catch((err) => {
      error = err
    })
    close = false
    subscription = null
  }

  api.subscribe(rpc, (err, val) => {
    if (err) error = err
    else value = map(val)

    if (close && subscription !== null) unsubscribe()
  })
  .then((id) => {
    subscription = id
    if (close) unsubscribe()
  })
  .catch((err) => {
    error = err
  })

  const read = (end, cb) => {
    if (end) {
      close = true
      if (subscription !== null) unsubscribe()
      return cb(end)
    }

    if (error) cb(error)
    else if (close) cb(true, value)
    else cb(null, value)
  }

  return read
}

module.exports = create

'use strict'

const defer = require('p-defer')

const init = {}

const create = (rpc, map) => (api) => {
  const ready = defer()
  let subscription = null
  let value = init
  let end = null

  const onData = (err, val) => {
    if (err) end = err
    else value = map(val)

    if (end) unsubscribe()
    ready.resolve()
  }

  api.subscribe(rpc, onData)
  .then((id) => {
    subscription = id

    if (end) unsubscribe()
  }, (err) => {
    end = err
  })

  const unsubscribe = () => {
    if (subscription === null) return

    api.unsubscribe(subscription)
    .catch((err) => {
      end = err
    })
    subscription = null
  }

  const read = (_end, cb) => {
    if (_end) {
      end = _end
      unsubscribe()
    }

    if (end) cb(end)
    else if (value === init) ready.promise.then(() => cb(end, value))
    else cb(null, value)
  }

  return read
}

module.exports = create

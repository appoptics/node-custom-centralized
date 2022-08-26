// for instrumentation
const apm = require('appoptics-apm')
require('./instrumentation-appoptics')

// the original app
const async = require('./thing-async')
const sync = require('./thing-sync')
const promise = require('./thing-promise')

// original app
/*
  sync('Star-Lord')
  async('Groot')
  promise('Gamora')
*/

// instrumented app
setTimeout(() => {
  apm.startOrContinueTrace(
    null,
    'App',
    () => {
      sync('Star-Lord')
      async('Groot')
      promise('Gamora')
    },
    {}
  )
}, 1000) // time out to give agent time to init, would most likely not be required in real world situations

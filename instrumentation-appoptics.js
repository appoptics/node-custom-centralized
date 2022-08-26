// for instrumentation
const apm = require('appoptics-apm')
const shimmer = require('shimmer')
const { Thing } = require('./class-export')

// The instrumentation
const proto = Thing.prototype

shimmer.wrap(proto, 'whoamiSync', whoamiSync => {
  return function wrappedWhoamiSync (n) {
    const spanInfoMaker = () => { return { name: 'whoamiSync-span', kvpairs: { whoami: n } } }
    const runner = () => whoamiSync.call(this, n)
    return apm.instrument(spanInfoMaker, runner, { collectBacktraces: true })
  }
})

shimmer.wrap(proto, 'whoami', whoami => {
  return function wrappedWhoami (n, cb) {
    const spanInfoMaker = () => { return { name: 'whoami-span', kvpairs: { whoami: n } } }
    const runner = cb => whoami.call(this, n, cb)
    return apm.instrument(spanInfoMaker, runner, { collectBacktraces: true }, cb)
  }
})

shimmer.wrap(proto, 'whoamiPromise', whoamiPromise => {
  return function wrappedwhoamiPromise (n, wait) {
    const spanInfoMaker = () => { return { name: 'whoamiPromise-span', kvpairs: { whoami: n } } }
    const runner = () => whoamiPromise.call(this, n, wait)
    return apm.pInstrument(spanInfoMaker, runner, { collectBacktraces: true })
  }
})

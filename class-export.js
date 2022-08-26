// The "thing" to be instrumented
const fs = require('fs')

module.exports.Thing = class Thing {
  constructor (logFile = 'log.txt') {
    this.logFile = logFile
  }

  log (str) {
    // hit auto instrumented function
    fs.appendFileSync(this.logFile, str)
  }

  whoamiSync (n) {
    this.log(`Sync: I am ${n}\n`)
    return `I am ${n}`
  }

  whoami (n, cb) {
    setTimeout(() => {
      this.log(`Async: I am ${n}\n`)
      // when returning a string, assumption is made is that the callback may have an error to report
      // in the first argument position. An error is reported as is while a string is converted to an
      // error then reported.
      cb(null, `I am ${n}`)
    }, 1)
  }

  whoamiPromise (n, wait = 100) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.log(`Promise: I am ${n}\n`)
        resolve(`I am ${n}`)
      }, wait)
    })
  }
}

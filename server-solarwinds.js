// for instrumentation
require('./instrumentation-solarwinds')

const http = require('http')

const async = require('./thing-async')
const sync = require('./thing-sync')
const promise = require('./thing-promise')

// a http server
const setServer = async () => {
  const port = 3000

  const server = http.createServer((req, res) => {
    const finalize = () => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end('Done')
    }

    sync('Star-Lord')
    async('Groot')
    promise('Gamora')

    finalize()
  })

  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

// IIFE invokes an async function with try/catch
// used to manage the UnhandledPromiseRejectionWarning warning
(async function () {
  try {
    await setServer()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()

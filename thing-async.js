const { Thing } = require('./class-export')

module.exports = (input) => {
  const thing = new Thing()

  thing.whoami(input, (err, str) => {
    console.log(`Async: ${str}`)
  })
}

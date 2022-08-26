const { Thing } = require('./class-export')

module.exports = (input) => {
  const thing = new Thing()

  thing.whoamiPromise(input, 0).then(str => {
    console.log(`Promise: ${str}`)
  })
}

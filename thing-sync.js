const { Thing } = require('./class-export')

module.exports = (input) => {
  const thing = new Thing()

  const str = thing.whoamiSync(input)
  console.log(`Sync: ${str}`)
}

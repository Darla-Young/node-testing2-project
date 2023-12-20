const Nouns = require('./model')

const check = async (req, res, next) => {
  const { thing } = req.body
  const newThing = thing.trim()
  const things = await Nouns.getStuff()
  let match = false

  things.forEach(i => {
    if(i.thing === newThing) match = true
  })

  if (match) res.status(400).json({message: 'This thing already exists!'})
  else {
    req.body.thing = newThing
    next()
  }
}

module.exports = {
  check,
}
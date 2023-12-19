const db = require('../../data/dbConfig')

module.exports = {
  addStuff,
  getStuff,
}

async function addStuff (stuff) {
  const id = await db('stuff').insert(stuff)
  const arr = await db('stuff').where('id', id[0])
  return arr[0]
}

async function getStuff () {
  const stuff = await db('stuff')
  return stuff
}
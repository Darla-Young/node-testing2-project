const express = require('express')
const { addStuff, getStuff } = require('./model')
const router = express.Router()

router.post('/', (req, res, next) => {
  addStuff(req.body)
    .then(stuff => res.status(201).json(stuff))
    .catch(next)
})

router.get('/', (req, res, next) => {
  getStuff()
    .then(stuff => res.json(stuff))
    .catch(next)
})

module.exports = router
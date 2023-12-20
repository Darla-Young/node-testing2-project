const express = require('express')
const { addStuff, getStuff, removeStuff } = require('./model')
const { check } = require('./middleware')
const router = express.Router()

router.post('/', check, (req, res, next) => {
  addStuff(req.body)
    .then(stuff => res.status(201).json(stuff))
    .catch(next)
})

router.get('/', (req, res, next) => {
  getStuff()
    .then(stuff => res.json(stuff))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  removeStuff(req.params.id)
    .then(response => res.json(response))
    .catch(next)
})

module.exports = router
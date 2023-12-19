const express = require('express')
const router = require('./stuff/router')
const server = express()

server.use(express.json())
server.use('/api/stuff', router)

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server
'use strict'

const fs = require('fs')

const async = require('async')
const bodyParser = require('body-parser')
const express = require('express')
const https = require('https')
const logger = require('morgan')

const deploy = require('./deploy')

const queue = async.priorityQueue((task, callback) => {
  task.run().done(() => {
    callback()
  })
}, 1)

const app = express()

app.use(bodyParser.json())

app.use((req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  // TODO: Add request checking logic.
  if (true) {
    queue.push({
      run: () => {
        return deploy.update(
          app.get('path'), app.get('branch'), app.get('keypath'))
      }
    }, 1)

    res.end('Triggering deploy.')
  } else {
    res.end('Not triggering deploy.')
  }
})

module.exports = (config) => {
  if (config.env === 'production') {
    app.use(logger('tiny'))
  } else {
    app.use(logger('dev'))
  }

  app.set('path', config.path)
  app.set('branch', config.branch)
  app.set('keypath', config.keypath)

  try {
    fs.statSync(`${config.path}/.git`)
  } catch (err) {
    queue.push({
      run: () => {
        return deploy.clone(
          config.path, config.repo, config.branch, config.keypath)
      }
    }, 0)
  }

  https.createServer({
    key: config.key,
    cert: config.cert
  }, app).listen(config.port)

  console.log(`Running on https://localhost:${config.port}\n`)
}

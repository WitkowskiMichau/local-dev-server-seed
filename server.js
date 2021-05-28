const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const DB_PATH = './db.json'
const DB_REF_PATH = './db_ref.json'

const userRoutes = require('./routes')
const generateMocks = require('./generateMocks')

const startDataServer = (mockData = false) => {
  const db = low(new FileSync(DB_PATH))
  const app = express()

  if (mockData) {
    generateMocks(db)
  }

  // HTTP request logger middleware for node.js
  app.use(morgan('tiny'))

  // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
  app.use(cors())

  // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
  app.use(bodyParser.json())

  // set headers
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache')
    next()
  })

  // future routers
  userRoutes(app, db)

  app.head('/', (req, res) => res.sendStatus(200))

  const PORT = 5001
  console.log(`listening on port ${PORT}`)
  app.listen(PORT)
}

if (!fs.existsSync(DB_PATH)) {
  // reference data with users that need to be there
  const ref = fs.createReadStream(DB_REF_PATH)

  // db file with both reference and future generated collections
  ref.pipe(fs.createWriteStream(DB_PATH))

  // starting server on
  ref.on('end', () => startDataServer(true))
} else {
  startDataServer()
}

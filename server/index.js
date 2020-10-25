const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const routes = require('./routes')
require('../model')

const app = express()
const port = 5000

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/api/', routes)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening on port ${port}`))
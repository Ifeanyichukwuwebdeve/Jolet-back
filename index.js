const Joi = require('joi')
const users = require('./routes/users')
const home = require('./routes/home')
const express = require('express')
const app = express()

app.use(express.json())
app.use('/api/users', users)
app.use('/', home)



const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}....`))

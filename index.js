const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const home = require('./routes/home')
const gameStatus = require('./routes/gameStats')
const express = require('express')

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api/users', users)
app.use('/api/game', gameStatus)
app.use('/', home)

// Connect to mongoose
mongoose.connect('mongodb://localhost/jolet-dev', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log('Mongodb connected'))
.catch(err => console.log(err))




const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}....`))

const mongoose = require('mongoose')
const users = require('./routes/users')
const home = require('./routes/home')
const express = require('express')

const app = express()
app.use(express.json())
app.use('/users', users)
app.use('/', home)

// Connect to mongoose
mongoose.connect('mongodb://localhost/jolet-dev', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Mongodb connected'))
.catch(err => console.log(err))

// Load gameStatus
require('./model/GameStatus')
const GameStatus = mongoose.model('GameStatus')

const newUSer = {
  level: updateLevels(),
  joletCoin: updateCoins(),
  answeredQuestions: updateAnswered()
}

function updateLevels() {
  const square = 2 * 2
  return square
}

function updateCoins() {
  const square = 2 * 2
  return square
}

function updateAnswered() {
  const square = 2 * 2
  return square
}

new GameStatus (newUSer)
.save()


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}....`))

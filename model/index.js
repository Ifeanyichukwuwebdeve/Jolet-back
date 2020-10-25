const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(`mongodb://mongo/jolet-dev`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
} else {
  mongoose.connect('mongodb://localhost/jolet-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then((req, res) => {
    console.log('Mongodb Connected')
  })
  .catch(err => {
    console.log(err)
  })
}

const GameStatus = require('./GameStatus')
const User = require('./User')
const Verification = require('./Verification')

module.exports = {
  GameStatus,
  User,
  Verification
}
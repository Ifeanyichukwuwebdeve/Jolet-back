const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const GameStatus = new Schema({
  level:{ type: Number},
  joletCoin: { type: Number},
  answeredQuestions: { type: Number}
})

mongoose.model('gameStatus', GameStatus)
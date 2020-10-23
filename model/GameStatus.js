const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const mongoosePaginate = require('mongoose-paginate-v2')

// Create Schema
const GameStatus = new Schema({
  level:{ type: Number},
  joletCoin: { type: Number},
  answeredQuestions: { type: Number}
})
// GameStatus.plugin(mongoosePaginate)
mongoose.model('gameStatus', GameStatus)
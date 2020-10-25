const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const mongoosePaginate = require('mongoose-paginate-v2')

// Create Schema
const GameStatus = new Schema({
  level:{ type: Number},
  joletCoin: { type: Number},
  answeredQuestions: { type: Number},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
}, { timestamps: true })
// GameStatus.plugin(mongoosePaginate)
const Games = mongoose.model('gameStatus', GameStatus)

module.exports = Games
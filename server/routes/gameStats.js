const express = require('express')
const mongoose  = require('mongoose')

const route = express.Router()
// Load gameStatus
const { GameStatus } = require('@model')

const userStatus = {
  level: updateLevels(),
  joletCoin: updateCoins(),
  answeredQuestions: updateAnswered()
}

function updateLevels() {
  
}

function updateCoins() {
  
}

function updateAnswered() {
  
}
 

route.get('/', (req, res) => {
  GameStatus.find({})
  .then(status => {
    res.send(status)
  })
  
})

route.get('/:id', (req, res) => {
  GameStatus.findOne({
    _id: req.params.id
  })
  .then(status => {
    res.send(status)
  })
  
})

route.put('/:id', (req, res) => {
  GameStatus.findOne({
    _id: req.params.id
  })
  .then(status => {
    status.level = req.body.level
    status.joletCoin = req.body.joletCoin
    status.answeredQuestions = req.body.answeredQuestions
    status.save()
    .then(status =>{
      res.send(status)
    })
  })
})

route.delete('/:id', (req, res) => {
  GameStatus.deleteOne({
    _id: req.params.id
  })
  .then(status => {
    res.send(status)
  })
})

module.exports = route
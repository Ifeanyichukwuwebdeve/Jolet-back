const express = require('express')
const mongoose = require('mongoose')

mongoose.set('debug', true)

const { GameStatus, User} = require('@model')
const {
  jwt: { decodeToken }
} = require('../utils')

const route = express.Router()
// const authRouter = express.Router()

function checkIfAuthorizedUser(req, gamestatus) {
  // this function takes in the whole request object and one
  // Games model object from the database and returns a boolean
  // based off of whether the user has permission to perform crud
  // operation on Mongo object
  const token = req.header('authorization').split(' ')[1]
  const decodedToken = decodeToken(token)

  return decodedToken.data.userId === gamestatus.createdBy.toString()
}



route.get('/', (req, res) => {
  GameStatus.find({})
  .then(status => {
    res.send(status)
  })
  
})

route.route('/:id')
  .get(async function (req, res) {
    try {
      const gamestatus = await GameStatus.findById(req.params.id)
      // const gamestatus = await GameStatus.findById(gamestatus.createdBy)
      console.log(gamestatus)
      // gamestatus.createdBy = user._id

      res.send({ gamestatus})
    } catch (err) {
      res.status(404).send(err)
    }
  })

// route.get('/:id', (req, res) => {
//   GameStatus.findOne({
//     _id: req.params.id
//   })
//   .then(status => {
//     res.send(status)
//   })
  
// })

route.route('/:id/update-level',) 
  .patch(async (req, res) => {
    try {
    const id = req.params.id
    const userGame = await GameStatus.findById(id)
    checkIfAuthorizedUser(req, userGame)
    userGame.level = req.body.level
    userGame.joletCoin - req.body.joletCoin
    userGame.answeredQuestions = 0
    await userGame.save()
      res.send('Updated successfully')
    } catch (error) {
      res.send(error)
    }
  })

// route.route('/:id/joletcoin',) 
//   .patch(async (req, res) => {
//     try {
//     const id = req.params.id
//     const userGame = await GameStatus.findById(id)
//     userGame.joletCoin = req.body.joletCoin
//     await userGame.save()
//       res.send('Updated successfully')
//     } catch (error) {
//       res.send(error)
//     }
//   })  

  route.route('/:id/answered',) 
  .patch(async (req, res) => {
    try {
      const id = req.params.id
      const index = req.body.answered
      const userGame = await GameStatus.findById(id)
      checkIfAuthorizedUser(req, userGame)
      userGame.answeredQuestions += index
      userGame.joletCoin += index
      await userGame.save()
      res.send('Updated successfully')
    } 
    catch (error) {
      res.send(error)
    }
  })
  
// route.delete('/:id', (req, res) => {
//   GameStatus.deleteOne({
//     _id: req.params.id
//   })
//   .then(status => {
//     res.send(status)
//   })
// })



module.exports = route
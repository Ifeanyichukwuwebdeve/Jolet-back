const express = require('express')
const mongoose = require('mongoose')

const { User, Withdraw, GameStatus } = require('@model')

const {
  jwt: { decodeToken }
} = require('../utils')

const router = express.Router()

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true)
}

function checkIfAuthorizedUser(req) {
  // this function takes in the whole request object and one
  // Games model object from the database and returns a boolean
  // based off of whether the user has permission to perform crud
  // operation on Mongo object
  const token = req.header('authorization').split(' ')[1]
  const decodedToken = decodeToken(token)

  return decodedToken.data.isAdmin === true
}

router.route('/users')
  .get(async (req, res) => {
    try {
      if (checkIfAuthorizedUser(req)) {
        const user = await User.find()
        res.status(200).send(user)
      }
      else{
        res.status(403).send('Unauthorized')
      }
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  })

router.route('/users/:id')
  .get(async (req, res) => {
    try {
      if (checkIfAuthorizedUser(req)) {
        const userId = req.params.id
        const user = await User.findById(userId)
        const userGame = await GameStatus.findById(user.userGame)
        const userInfo = {
          user,
          userGame
        }
        res.status(200).send(userInfo)
      } else {
        res.status(403).send('Unauthorized')
      }
      
    } catch (error) {
      res.send(error)
    }
  })

router.route('/withdraw')
  .get(async (req, res) => {
    try {
      if (checkIfAuthorizedUser(req)) {
        const request = await Withdraw.find()
        res.send(request)
      } else {
        res.status(403).send('Unauthorized')
      }
      
    } catch (error) {
        res.send(error).status(400)
    }
  })
  
router.route('/withdraw/:id/payment')
  .patch(async (req, res) => {
    try {
      if (checkIfAuthorizedUser(req)) {
        const id = req.params.id
        console.log(req.body)
        const paid = req.body.paid
        console.log(paid)
        const withdrawRequest = await Withdraw.findById(id)
        withdrawRequest.paymentComfirmed = paid
        const resonse = await withdrawRequest.save()
        console.log(withdrawRequest)
        res.send(resonse)
      } else {
        res.status(403).send('Unauthorized')
      }
      } catch (error) {
        res.send(error)
      }
  })
module.exports = router
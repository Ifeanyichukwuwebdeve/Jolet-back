const express = require('express')
const mongoose = require('mongoose')

const { User, Withdraw, GameStatus } = require('@model')

const router = express.Router()

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true)
}

router.route('/users')
  .get(async (req, res) => {
    try {
      const user = await User.find()
      res.status(200).send(user)
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  })

router.route('/users/:id')
  .get(async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId)
    const userGame = await GameStatus.findById(user.userGame)
    const userInfo = {
       user,
       userGame
    }
    res.status(200).send(userInfo)
  })

router.route('/withdraw')
  .get(async (req, res) => {
    try {
    const request = await Withdraw.find()
    res.send(request)
    } catch (error) {
        res.send(error).status(400)
    }
  })
  
router.route('/withdraw/:id/payment')
  .patch(async (req, res) => {
    try {
      const id = req.params.id
      console.log(req.body)
      const paid = req.body.paid
      console.log(paid)
      const withdrawRequest = await Withdraw.findById(id)
      withdrawRequest.paymentComfirmed = paid
      const resonse = await withdrawRequest.save()
      console.log(withdrawRequest)
      res.send(resonse)
      } catch (error) {
        res.send(error)
      }
  })
module.exports = router
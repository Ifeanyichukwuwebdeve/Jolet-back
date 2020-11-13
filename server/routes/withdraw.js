const express = require('express')
const mongoose = require('mongoose')

const { Withdraw } = require('@model')

const router = express.Router()

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true)
}

router.route('/')
  .get(async (req, res) => {
   try {
    const request = await Withdraw.find()
    res.send(request)
   } catch (error) {
     res.send(error).status(400)
   }
  })

router.route('/')
  .post(async (req, res) => {
    const { userId, userName, userEmail, bank, accountName, bankAccountNum, amount } = req.body

    try {
        const withdrawRequest = new Withdraw({
          userId,
          userName,
          userEmail,
          bank,
          accountName,
          bankAccountNum,
          amount
        })
        const request = await withdrawRequest.save()
        console.log(request)

        res.status(201).send(request)
      
    } catch(err) {
      console.error(err)
      res.sendStatus(400)
    }
  })

module.exports = router
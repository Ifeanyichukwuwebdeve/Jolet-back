const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const {
  auth: { hashPassword },
  jwt: { generateToken },
  mailgun: { sendEmail }
} = require('../utils')

mongoose.set('debug', true)

const { User, Verification, GameStatus } = require('@model')

const router = express.Router()

router.route('/login')
  .post(async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        res.status(401).send('Invalid Login Credentials')
      }

      const token = generateToken(user._id, user.isAdmin)

      let payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        country: user.country,
        Game: user.userGame,
        isAdmin: user.isAdmin,
        token
      }
      res.send(payload)
    }
     catch (err) {
        // console.log(err)
    }
  })

router.route('/register')
  .post(async (req, res) => {
    const { firstName, lastName, email, password, country, phone, reffered } = req.body

    try {
      if (password.length >= 8) {
        const hash = await hashPassword(password)
        const user = new User({
          firstName,
          lastName,
          email,
          password: hash,
          country,
          phone,
          reffered
        })
        if (user.email === User.findOne({ email })) {
          res.statusCode(409).send('Email already exists')
        }

        const setLevel = 1
        const setJoletCoin = 0
        const setAnsweredQuestions = 0
        const gameStatus = new GameStatus({
          level: setLevel,
          joletCoin: setJoletCoin,
          answeredQuestions: setAnsweredQuestions,
          createdBy: user._id
        })
        const game = await gameStatus.save()
        user.userGame = game._id
        const userRes = await user.save()
        console.log(userRes)
        console.log(game)

        const code = Math.floor(Math.random() * (999999 - 100000) + 100000)
        const verification = new Verification({
          userId: userRes._id,
          code
        })
        await verification.save()

        const payload = {
          code,
          email
        }
        await sendEmail(payload)
        res.status(201).send({ firstName, email })
      } 
      else {
        res.send('Invalid credentials').status(400)
      }
    } catch(err) {
      console.error(err)
      res.sendStatus(400)
    }
  })

router.route('/verify')
  .post(async (req, res) => {
    const { email, code } = req.body

    try {
      const user = await User.findOne({ email })
      const verify = await Verification.findOne({ userId: user._id })

      if (verify.code === parseInt(code)) {
        user.isVerified = true
        await user.save()
        res.send('Verified')
        return true
      } else {
        res.status(400).send('Invalid Code')
      }
    } catch (err) {
      res.status(400).send('Invalid Code')
    }
  })

router.route('/logout')

module.exports = router
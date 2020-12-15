const express = require('express')
const mongoose = require('mongoose')

const { User } = require('@model')
const bcrypt = require('bcryptjs')
const { hashPassword } = require('../utils/auth')

const router = express.Router()

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true)
}

// router.route('/:id/game')
//   .get(async (req, res) => {
//     const userId = req.params.id

//     const curricula = await GameStatus.paginate({ createdBy: userId }, {
//       page: parseInt(req.query.page) || 1,
//       limit: 5
//     })
//     res.send(curricula)
//   })

router.route('/:id/update-password')
  .post(async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body

    if (newPassword.length >= 8) {
      res.send(400)
    }
    
    const id = req.params.id
    const user = await User.findById(id)

    const isValid = await bcrypt.compare(oldPassword, user.password)
    if (!isValid) {
      res.status(400).send('Invalid Password')
    }

    user.password =  await hashPassword(newPassword)
    await user.save()
    } catch (error) {
      console.log(error)
    }

  })

router.route('/updateVerified/:id')
  .patch(async (req, res) => {
    try {
      const userId = req.params.id
      const user = await User.findById(userId)
      const { isVerified } = req.body
      if (isVerified) user.isVerified = isVerified
      await user.save()

      res.send(201)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId)
    res.send(user)
  })
  .patch(async (req, res) => {
    const userId = req.params.id
    const { firstName, lastName, email, country, phone } = req.body

    const user = await User.findById(userId)

    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (email) user.email = email
    if (country) user.country = country
    if (phone) user.phone = phone

    await user.save()

    res.send(201)
  })
  .delete(async (req, res) => {
    try {
      const userId = req.params.id
    const user = await User.findById(userId).deleteOne({})
    res.send(user)
    } catch (error) {
      console.log(error)
    }
  })

router.route('/')
  .get(async (req, res) => {
    const users = await User.find()
    res.send(users)
  })

module.exports = router
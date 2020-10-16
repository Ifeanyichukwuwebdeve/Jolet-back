const Joi = require('joi')
const express = require('express')
const bcrypt = require('bcryptjs')
const mongoose  = require('mongoose')

const route = express.Router()

// Load user model
require('../model/User')
const User = mongoose.model('users')


// Get users
route.get('/', (req, res) => {
  User.find({})
  .then(user => {
    res.send(user)
  })
})

route.post('/register', (req, res) => {
    
    const { error } = userValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const newUser =  new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country,
        phone: req.body.phone,
        reffered: req.body.reffered
    })
    
    bcrypt.genSalt(10, (error, salt => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err
        newUser.password = hash
        newUser.save()
          .then(user => {
            req.send(user)
          })
        .catch(err => {
          console.log(err)
          return
        })
      })
    }))
})

route.put('/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if (!user) return res.status(404).send('user with the given id does not exist.')

    const { error } = userValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

        user.firstName = req.body.firstName,
        user.lastName = req.body.lastName,
        user.email = req.body.email,
        user.password = req.body.password,
        user.country = req.body.country,
        user.phone = req.body.phone,
        user.reffered = req.body.reffered

    res.send(user)

})

route.delete('/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if (!user) return res.status(404).send('user with the given id does not exist.')

    const index = users.indexOf(user)
    users.splice(index, 1)

    res.send(user)
})


route.get('/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if (!user) return res.status(404).send('user with the given id does not exist.')
    res.send(user)
})

const userValidation = (user) => {
    const schema = Joi.object({
        firstName: Joi.string()
        .min(3)
        .max(30)
        .required(),

        lastName: Joi.string()
        .min(3)
        .max(30)
        .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

        passwordRepeat: Joi.ref('password'),

        access_token: [
            Joi.string(),
            Joi.number()
        ],
        country: Joi.string()
          .min(3)
          .max(30)
          .required(),

        phone: Joi.number()
          .required(),

        reffered: Joi.string()
          .min(3)
          .max(30)
          .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        })

    

    return schema.validate(user)
}

module.exports = route
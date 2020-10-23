const Joi = require('joi')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const UserModel = require('../model/User')

passport.use(
  'local',
  new localStrategy(
    {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      country: 'country',
      phone: 'phone',
      reffered: 'reffered'
    },
    async (firstName, lastName, email, password, country, phone, reffered, done) => {

      const { error } = userValidation(req.body)
      if (error) return res.status(400).send(error.details[0].message)

      try {
        const user = await UserModel.create({ firstName, lastName, email, password, country, phone, reffered, })

        return done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.use(
  'login',
  new localStrategy(
    {
      email: 'email',
      password: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email })

        if (!user) {
          return done(null, false, { message: 'User not found' })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' })
        }

        return done(null, user, { message: 'Logged in Successfully' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

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
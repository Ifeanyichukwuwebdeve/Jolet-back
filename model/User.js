const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName:{
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200
  },
  email: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 200,
    unique: true,
    match: /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1200
  },
  country: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 200
  },
  phone: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 200
  },
  reffered: {
    type: String,
  },
  status: {
    isAdmin: false,
    isOperators: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
}, { timestamps: true })

UserSchema.pre(
  'save',
  async function(next) {
    const user = this
    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash
    next()
  }
)

UserSchema.methods.isValidPassword = async function(password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)

  return compare
}

mongoose.model('users', UserSchema)
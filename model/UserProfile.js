const mongoose = require('mongoose')

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 30
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 30
  },
  bio: {
    type: String
  },
  twitter: {
    type: String
  },
  facebook: {
    type: String
  },
  linkedin: {
    type: String
  },
  website: {
    type: String
  },
  bank: {
    type: String,
    minLength: 3,
    maxLength: 130
  }
}, { timestamps: true })

const UserProfile = mongoose.model('User', UserProfileSchema)

module.exports = UserProfile
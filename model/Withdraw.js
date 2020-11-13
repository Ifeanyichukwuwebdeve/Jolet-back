const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Withdraw = new Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userName:{
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200
  },
  userEmail: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 200,
    match: /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/
  },
  bank:{
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200
  },
  accountName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200
  },
  bankAccountNum: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 200,
  },
  amount: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1200
  },
  paymentComfirmed: {
    type: Boolean,
    default: false
  },
}, { timestamps: true })


const withdrawRequest = mongoose.model('withdrawRequest', Withdraw)
module.exports = withdrawRequest
const {
  jwt: { decodeToken }
} = require('../utils')


function checkIsVerified(req, res, next) {
  try {
    const token = req.header('authorization').split(' ')[1]
    const decodedToken = decodeToken(token)
    if (decodedToken.data.isVerified === true) {
      next()
      console.log(decodedToken.data.isVerified)
    } else {
      res.status(401).send('Not Authorized')
    }
  } catch (error) {
    res.send(error)
  }
}

module.exports = checkIsVerified
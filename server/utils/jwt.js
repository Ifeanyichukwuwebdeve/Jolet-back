var jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET
const header = {
  typ: 'JWT',
  alg: 'HS512'
}

function generateToken(userId, isAdmin) {
  const data = {
    userId,
    isAdmin
  }

  return jwt.sign({ data }, secret, { expiresIn: '30d' })
}

function decodeToken(token) {
  return jwt.verify(token, secret)
}

function checkToken(token) {
  try {
    jwt.verify(token, secret)
    return true
  } catch (err) {
    return false
  }
}

module.exports = { generateToken, decodeToken, checkToken }
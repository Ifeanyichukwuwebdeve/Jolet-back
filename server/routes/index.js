const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/auth')

// const { curricula, authCurricula } = require('./curricula')
const game = require('./gameStats')
const auth = require('./auth')
const users = require('./users')
const withdraw = require('./withdraw')
const admin = require('./admin')


// router.use('/curricula', curricula)
// router.use('/curricula', authMiddleware, authCurricula)
router.use('/game', authMiddleware, game)
router.use('/auth', auth)
router.use('/withdraw', authMiddleware, withdraw)
router.use('/users', users)
router.use('/admin', authMiddleware, admin)


module.exports = router
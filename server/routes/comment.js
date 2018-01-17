const express = require('express')
const router = express.Router()
const Koment = require('../controllers/ccommentController')
const isLogin = require('../middleware/isLogin')

router.post('/', isLogin, Koment.createComment)

module.exports = router
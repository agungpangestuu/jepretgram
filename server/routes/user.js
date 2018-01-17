const express = require('express')
const router = express.Router()
const User = require('../controllers/userController')
const isLogin = require('../middleware/isLogin')

router.get('/', User.userFindAll)
router.get('/:username', User.userFindUsername)
router.get('/:id', isLogin, User.userFindById)
router.post('/', User.userCreate)
router.put('/:id', isLogin, User.updateUser)
router.delete('/:id', User.destroyUser)
router.post('/signin', User.SignIn)
router.post('/fb', User.fbLogin)
router.put('/follow/:id', isLogin, User.follow)
router.put('/unfollow/:id', isLogin, User.unfollow)

module.exports = router
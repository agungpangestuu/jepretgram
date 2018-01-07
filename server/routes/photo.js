const express = require('express')
const router = express.Router()
var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
const images = require('../middleware/uploadCheck.js')
// const upload = require('../controllers/uploadsController.js')
const uploaded = images.multer.single('photos')
const Photo = require('../controllers/photoController')
const login = require('../middleware/isLogin')


router.get('/', Photo.findAllPhoto)
router.get('/:idUser', Photo.photoFindById)
router.put('/:id', Photo.updatePhoto)
router.delete('/:id', Photo.destroyPhoto)

// multer 
router.post('/', function (req, res, next) {
    uploaded(req, res, function(err){
        if (err) {
            console.log(err)
            return res.status(400).json({
                message : "err"
            })
        } 
        else {
            next()
        }
    })
  }, images.sendUploadToGCS, (req,res) => {
      console.log(req.body)
      res.json({
          url: req.file.cloudStoragePublicUrl
      })
  })
router.post('/:username', login, Photo.photoCreate)
module.exports = router 

const ObjectId = require('mongodb').ObjectId
const Koment = require('../models/commentModel')
const Photo = require('../models/photoModel')

const createComment = function (req, res) {
  let dataKoment = new Koment({
    koment: req.body.koment,
    by: ObjectId(req.body.decoded.id),
    photo: ObjectId(req.body.photiId)
  })
  
  dataKoment.save()
    .then(dataSave => {
      Photo.findByIdAndUpdate({_id: ObjectId(req.body.photoId)}, {$push: {'koment': ObjectId(dataSave._id)}})
        .then(dataPhoto => {
          res.status(200).json({
            message: 'Sukses create comment',
            data: dataSave
          })
        })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Gagal Create Comment'
      })
    })
}

const UpdateKoment = function (req, res) {
  let id = {
    _id: req.params.id
  }
  Koment.findOne(id)
    .then(data => {
      data.koment = req.body.koment || data.koment
      
      data.save()
        .then(data => {
          res.status(200).json({
            data: data
          })
        })
        .catch(err => {
          res.status(500).json({
            erorr: err
          })
        })
    })
}

module.exports = {
  createComment,
  UpdateKoment
};
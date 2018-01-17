const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  koment : {
    type : String,
    required : true
  },
  by : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  photo : {
    type : Schema.Types.ObjectId,
    ref : 'Photo',
    required : true
  },
  create_at : {
    type : Date,
    default : Date.now
  }
})

const komentModels = mongoose.model('Koment', commentSchema)
module.exports = komentModels
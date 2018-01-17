const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const multer = require('multer')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()

//parse application/json and look for raw text     
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
 
app.use(morgan('dev'))         
app.use(cors())                         

// connect db
mongoose.Promise = global.Promise
mongoose.connect(process.env.URL, { useMongoClient: true });

app.get('/', (req, res) => res.json({message: "Welcome to jepretgram API!"}))
app.use('/api/users', require('./routes/user'))
app.use('/api/photos', require('./routes/photo'))
app.use('/api/koment', require('./routes/comment'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const DB_URL = 'mongodb://localhost:27017'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
  console.log('connection ...')
})

const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require: true},
  age: {type: String, require: true}
}))

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => {
  User.find({}, function(err, doc) {
    if (err) {
      res.send(err)
    } else {
      res.send(doc)
    }
  })
})

app.get('/data', (req, res) => {
  User.find({}, function(err, doc) {
    if (err) {
      res.send(err)
    } else {
      res.send(doc)
    }
  })
})

app.get('/add', (req, res) => {
  User.create({
    user: 'no' + parseInt(Math.random() * 1000000),
    age: parseInt(Math.random() * 100)
  }, function(err, doc) {
    if (err) {
      res.send(err)
    } else {
      res.send(doc)
    }
  })
})

app.get('/deleteall', (req, res) => {
  User.remove({}, function(err) {
    if (err) return res.send(err)
    return res.send('/deleteall ... ...')
  })
})

app.listen(3456, () => {
  console.log('express app listening on port 3456')
})

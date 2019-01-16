const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const userRouter = require('./User')

// 链接 mongodb
// const mongoose = require('mongoose')
// const DB_URL = 'mongodb://localhost:27017'
// mongoose.connect(DB_URL)
// mongoose.connection.on('connected', function() {
//   console.log('connection ...')
// })

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/user', userRouter)

app.listen(3456, () => {
  console.log('express app listening on port 3456')
})

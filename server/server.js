const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// 路由
const userRouter = require('./User')

io.on('connection', (socket) => {
  console.log('server socket connection ...')
  socket.on('sendmsg', function(data) {
    console.log(data)
    io.emit('recvmsg', data)
  })
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/user', userRouter)

server.listen(3456, () => {
  console.log('express app listening on port 3456')
})

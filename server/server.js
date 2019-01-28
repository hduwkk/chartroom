const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
// 路由
const userRouter = require('./User')

// 数据model
const model = require('./model')
const Chat = model.getModel('chat')
const socketidMap = {} // userid: socketid

io.on('connection', (socket) => {
  socket.emit('socketid', socket.id)
  socket.on('setUserId', function(userid) {
    socketidMap[userid] = socket.id
    console.log('setUserId', socket.id)
  })

  socket.on('sendmsg', function(data) {
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    const targetSocketId = socketidMap[to]
    console.log(targetSocketId, 'targetSocketId')
    console.log(msg, 'sendmsg')
    Chat.create({chatid, from, to, content: msg}, function(err, doc) {
      const message = Object.assign({}, doc._doc) || {a: 1111111}
      socket.emit('recvmsg', message)
      if (targetSocketId) {
        socket.to(targetSocketId).emit('recvmsg', {test: '测试...'})
      }
    })
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

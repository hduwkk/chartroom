import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'

assethook({extensions: ['png'], limit: 9000})

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// 数据model
const model = require('./model')
const Chat = model.getModel('chat')

const socketidMap = {} // userid: socketid
io.on('connection', (socket) => {
  socket.emit('socketid', socketidMap)
  socket.on('setUserId', function(userid) {
    socketidMap[userid] = socket.id
    console.log('setUserId', socket.id)
  })

  socket.on('sendmsg', function(data) {
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    const targetSocketId = socketidMap[to]
    console.log(targetSocketId, 'targetSocketId')
    const message = {
      content: msg
    }

    if (targetSocketId) {
      io.to(targetSocketId).emit('recvmsg', message)
    }
    Chat.create({chatid, from, to, content: msg}, function(err, doc) {
      const message = Object.assign({}, doc._doc)
      socket.emit('recvmsg', message)
      if (targetSocketId) {
        io.to(targetSocketId).emit('recvmsg', message)
      }
    })
  })
})

// 路由
const userRouter = require('./User')
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/user', userRouter)

app.use(function(req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/') || req.url.startsWith('/favicon.ico')) {
    return next()
  }
  return res.sendFile(path.resolve('build/index.html'))
})

app.use('/', express.static(path.resolve('build')))

server.listen(9093, () => {
  console.log('express app listening on port 9093')
})

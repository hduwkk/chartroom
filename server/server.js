const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const model = require('./model')
// 路由
const userRouter = require('./User')
// 数据model
const Chat = model.getModel('chat')
io.on('connection', (socket) => {
  console.log('server socket connection ...')
  socket.on('sendmsg', function(data) {
    console.log(data)
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, function(err, doc) {
      console.log('doc._doc ************')
      console.log(doc._doc)
      console.log('doc._doc ************')
      io.emit('recvmsg', Object.assign({}, doc._doc))
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

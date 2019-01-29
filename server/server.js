import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
import staticPath from '../build/asset-manifest.json'

import React from 'react'
import {renderToString} from 'react-dom/server'
import {createStore, applyMiddleware, compose} from 'redux'
import {StaticRouter} from 'react-router-dom'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import reducer from '../src/reducer'
import '../src/config'
import '../src/index.css'

import App from '../src/app'
assethook({extensions: ['png']})

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
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }

  const context = {}
  const store = createStore(reducer, compose(
    applyMiddleware(thunk)
  ))

  const markup = renderToString(
    (<Provider  store={store}>
      <StaticRouter location={req.url} context={context}>
        <App></App>
      </StaticRouter>
    </Provider>))

    const layout = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="stylesheet" href="/${staticPath['main.css']}" />
        <title>React App</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${markup}</div>
      </body>
    </html>`


  res.send(layout)
  // return res.sendFile(path.resolve('build/index.html'))
})

app.use('/', express.static(path.resolve('build')))

server.listen(3456, () => {
  console.log('express app listening on port 3456')
})

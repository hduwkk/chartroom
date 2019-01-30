import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
import {renderToString} from 'react-dom/server'
import React from 'react'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../src/reducer'
import axios from 'axios'

import App from '../src/app.js'
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

  const layout = `<!doctype html>
  <html lang="en">
  
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="/manifest.json" />
    <title>React App</title>
    <link href="/static/css/1.d86a6cac.chunk.css" rel="stylesheet">
    <link href="/static/css/main.388b3f5a.chunk.css" rel="stylesheet">
  </head>
  
  <body><noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${markup}</div>
    <script>
      ! function (l) {
        function e(e) {
          for (var r, t, n = e[0], o = e[1], u = e[2], f = 0, i = []; f < n.length; f++) t = n[f], p[t] && i.push(p[t][0]),
            p[t] = 0;
          for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (l[r] = o[r]);
          for (s && s(e); i.length;) i.shift()();
          return c.push.apply(c, u || []), a()
        }
  
        function a() {
          for (var e, r = 0; r < c.length; r++) {
            for (var t = c[r], n = !0, o = 1; o < t.length; o++) {
              var u = t[o];
              0 !== p[u] && (n = !1)
            }
            n && (c.splice(r--, 1), e = f(f.s = t[0]))
          }
          return e
        }
        var t = {},
          p = {
            2: 0
          },
          c = [];
  
        function f(e) {
          if (t[e]) return t[e].exports;
          var r = t[e] = {
            i: e,
            l: !1,
            exports: {}
          };
          return l[e].call(r.exports, r, r.exports, f), r.l = !0, r.exports
        }
        f.m = l, f.c = t, f.d = function (e, r, t) {
          f.o(e, r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get: t
          })
        }, f.r = function (e) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(e, "__esModule", {
            value: !0
          })
        }, f.t = function (r, e) {
          if (1 & e && (r = f(r)), 8 & e) return r;
          if (4 & e && "object" == typeof r && r && r.__esModule) return r;
          var t = Object.create(null);
          if (f.r(t), Object.defineProperty(t, "default", {
              enumerable: !0,
              value: r
            }), 2 & e && "string" != typeof r)
            for (var n in r) f.d(t, n, function (e) {
              return r[e]
            }.bind(null, n));
          return t
        }, f.n = function (e) {
          var r = e && e.__esModule ? function () {
            return e.default
          } : function () {
            return e
          };
          return f.d(r, "a", r), r
        }, f.o = function (e, r) {
          return Object.prototype.hasOwnProperty.call(e, r)
        }, f.p = "/";
        var r = window.webpackJsonp = window.webpackJsonp || [],
          n = r.push.bind(r);
        r.push = e, r = r.slice();
        for (var o = 0; o < r.length; o++) e(r[o]);
        var s = n;
        a()
      }([])
    </script>
    <script src="/static/js/1.2de8992e.chunk.js"></script>
    <script src="/static/js/main.0cf3f051.chunk.js"></script>
  </body>
  
  </html>`

  return res.send(layout)
})

app.use('/', express.static(path.resolve('build')))

server.listen(9093, () => {
  console.log('express app listening on port 9093')
})

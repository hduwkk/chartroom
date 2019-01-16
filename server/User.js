const express = require('express')
// const utils = require('utility') // 加密用的
const model = require('./model')

const Router = express.Router()
// const _filter = {'pwd': 0, '_v': 0} // 过滤不必要的字段

const User = model.getModel('user')

Router.get('/list', (req, res) => {
  const {type} = req.query
  User.find({type}, (err, doc) => {
    if (err) return {code: 1, msg: err}
    return res.json({code: 0, data: doc})
  })
})
// 注册
Router.post('/register', function(req, res) {
  console.log('/register ... ...')
  const {user, pwd} = req.body
  User.findOne({user}, (err, doc) => { // 查询得到
    console.log('findOne .. .. ..')
    if (doc) return res.json({code: 1, msg: '用户名已存在'})
    const userModel = new User({user, pwd})
    userModel.save((e, d) => {
      if (e) return res.json({code: 1, msg: '服务器错误'})
      // const {user, type, _id} = d
      // 注册成功返回整个文档
      return res.json({code: 0, data: d})
    })
  }).catch(() => {
    console.log('errror ... ..')
  })
})

// 登录
Router.post('/login', function(req, res) {
  const {user, pwd} = req.body
  User.findOne({user, pwd}, (err, doc) => {
    if (err || !doc) return res.json({code: 1, msg: '用户名或者密码错误'})
    return res.json({code: 0, data: doc})
  })
})

Router.get('/info', (req, res) => {
  // 用户有没有cookie
  return res.send({code: 1})
})

module.exports = Router
const express = require('express')
const utils = require('utility') // 加密用的
const model = require('./model')

const Router = express.Router()
const _filter = {'pwd': 0, '__v': 0} // 过滤不必要的字段

const User = model.getModel('user')
const Chat = model.getModel('chat')

function md5Pwd(pwd){
	const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
	return utils.md5(utils.md5(pwd+salt))
}

Router.get('/list', (req, res) => {
  const {type} = req.query
  User.find({type}, _filter, (err, doc) => {
    if (err) return {code: 1, msg: err}
    return res.json({code: 0, data: doc})
  })
})

Router.get('/getmsglist', (req, res) => {
  const user = req.cookies.userid
  User.find({}, function(e, userdoc) {
    let users = {}
    userdoc.forEach(({_id, user, avatar}) => {
      users[_id] = {name: user, avatar}
    })
    Chat.find({'$or': []}, function(err, doc) {
      if (err) {
        return res.json({code: 1, msgs: [], users: {}})
      } else {
        return res.json({code: 0, msgs: doc, users})
      }
    })
  })
})

Router.post('/readmsg', (req, res) => {
  const userid = req.cookies.userid
  const {from} = req.body
  Chat.update(
    {from, to: userid},
    {'$set': {read: true}},
    {'multi': true},
    (err, doc) => {
      if (!err) {
        return res.json({code: 0, num: doc.nModified})
      }
      return res.json({code: 1, msg: '修改失败'})
    }
  )
})

Router.post('/update', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) return res.json({code: 1})
  const body = req.body
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      type: doc.type,
      user: doc.user
    }, body)
    return res.json({code: 0, data})
  })
})

// 注册
Router.post('/register', function(req, res) {
  console.log('/register ... ...')
  const {user, pwd, type} = req.body
  User.findOne({user}, _filter, (err, doc) => { // 查询得到
    console.log('findOne .. .. ..')
    if (doc) return res.json({code: 1, msg: '用户名已存在'})
    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save((e, d) => {
      if (e) return res.json({code: 1, msg: '服务器错误'})
      // 设置cookie
      res.cookie('userid', d._id)
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
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
    if (err || !doc) return res.json({code: 1, msg: '用户名或者密码错误'})
    // 设置cookie
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})

// 身份获取
Router.get('/info', (req, res) => {
  // 用户有没有cookie
  let {userid} = req.cookies
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({'_id': userid}, _filter, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '后端出错'})
    } else {
      return res.json({code: 0, data: doc})
    }
  })
})

module.exports = Router
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/imooc-chat'

mongoose.connect(DB_URL, {useNewUrlParser: true})
mongoose.connection.on('connected', function() {
  console.log('mongoose connected ... ...')
})

const models = {
  user: {
    user: {type: String, require: true},
    pwd: {type: String, require: true},
    type: {type: String, require: true},
    avatar: {type: String}, // 头像
    desc: {type: String}, // 个人简介或者职位简介
    title: {type: String}, // 职位名
    company: {type: String}, // boss: 公司
    money: {type: String} // boss: 薪资
  },
  chat: {
    'chatid': {'type': String, require: true},
    'from': {type: String, require: true},
    'to': {type: String, require: true},
    'content': {type: String, require: true, default: ''},
    'create_time': {type: Number, require: true, default: Date.now},
    'read': {type: Boolean, default: false}
  }
}

// const User = mongoose.model('user', new mongoose.Schema({
//   user: {type: String, require: true},
//   age: {type: String, require: true}
// }))

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}

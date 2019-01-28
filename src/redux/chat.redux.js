import axios from 'axios'
import io from 'socket.io-client'
export const socket = io('ws://localhost:3456')
socket.on('socketid', function (data) {
  console.log('socketid', data)
})
const MSG_LIST = 'MSG_LIST' // 获取聊天列表
const MSG_RECV = 'MSG_RECV' // 读取信息
const MSG_READ = 'MSG_READ' // 已读信息

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chat (state = initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.unread.length}
    case MSG_RECV:
      const n = action.payload.msg.to === action.payload.userid ? 1 : 0
      return {...state, chatmsg: [...state.chatmsg, action.payload.msg], unread: state.unread + n}
    case MSG_READ:
      // const {from, num} = action.payload
      return {...state, chatmsg: state.chatmsg}
    default:
      return {...state}
  }
}

function msgRead({from,userid,num}) {
  return {type: MSG_READ, payload: {from, userid, num}}
}

function msgList(msgs, users, userid) {
  const unread = msgs.filter((msg) => {
    return !msg.read && msg.to === userid
  })
  return {type: MSG_LIST, payload: {msgs, users, userid, unread}}
}

function msgRecv(msg, userid) {
  return {type: MSG_RECV, payload: {msg, userid}}
}

export function readMsg(from) {
  // 点开未读消息，触发readMsg，修改消息的read字段
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {from}).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id
        dispatch(msgRead({from, userid, num: res.data.num}))
      }
    })
  }
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function(data) {
      console.log('recvmsg', data)
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    console.log('sendMsg', {from, to, msg})
    socket.emit('sendmsg', {from, to, msg})
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist').then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id
        dispatch(msgList(res.data.msgs, res.data.users, userid))
      }
    })
  }
}

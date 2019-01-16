import Axios from 'axios'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LODA_DATA'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

export function user(state = initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
    case LOAD_DATA: 
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOGOUT: 
      return {...initState, redirectTo: '/login'}
    default:
      return state
  }
}

function getRedirectPath({type, avatar}) {
  // 根据用户信息 返回跳转地址
  let url = type === 'boss' ? '/boss' : '/genius'
  if (!avatar) {
    url += 'info'
  }
  return url
}

function errorMsg(msg) {
  return {type: ERROR_MSG, msg}
}

function authSuccess(obj) {
  const {pwd, ...data} = obj // 剔除密码
  return {type: AUTH_SUCCESS, payload: data}
}

export function lodaData(userInfo) {
  return {type: LOAD_DATA, payload: userInfo}
}

export function logoutSubmit() {
  return {type: LOGOUT}
}


export function register({user, pwd, repeatPwd, type}) {
  if (!(user && pwd && type)) {
    return errorMsg('用户名密码必须输入!')
  } else if (pwd !== repeatPwd) {
    return errorMsg('两次密码不一致!')
  }
  return dispatch => {
      Axios.post('/user/register', {user, pwd, type}).then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({user, pwd, type}))
        } else {
          dispatch(errorMsg({msg: res.data.msg}))
        }
      })
  }
}
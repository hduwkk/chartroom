// 行为
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'

const initState = {
  isAuth: false,
  user: '李云龙',
  age: 20
}

export function auth(state = initState, action) {
  switch(action.type) {
    case 'LOGIN': return {...state, isAuth: true}
    case 'LOGOUT': return {...state, isAuth: false}
    case 'USER_DATA': return {...state, user: action.payload.user, age: action.payload.age}
    default: return state
  }
}

// action creator
export function getUserData() {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'USER_DATA',
        payload: {
          user: 'BOB',
          age: 66
        }
      })
    }, 1000)
  }
}

export function userData(data){
	return {type:USER_DATA,payload:data}
}

export function login(){
	return {type:LOGIN}
}

export function logout(){
	return {type:LOGOUT}
}
import {combineReducers} from 'redux'
import {user} from './redux/user.redux'
import {chat} from './redux/chat.redux'
import {chatuser} from './redux/chatuser.redux'

export default combineReducers({user, chat, chatuser})
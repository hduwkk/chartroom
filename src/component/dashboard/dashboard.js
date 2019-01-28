import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import {NavBar} from 'antd-mobile'
import {recvMsg, getMsgList} from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'

import Genius from '../genius/genius'
import Boss from '../boss/boss'
import User from '../user/user'
import Msg from '../msg/msg'

@connect(
  state => state,
  {recvMsg, getMsgList}
)
class Dashboard extends React.Component {
  componentDidMount() {
    console.log('dashboard ... ...')
    if (!this.props.chat.chatmsg.length) {
      console.log('*** 执行 recvMsg(), getMsgList() ***')
      this.props.recvMsg() // 监听socket推过来的消息
      this.props.getMsgList() // 获取所有users, msgs
    }
  }
  render() {
    const pathname = this.props.location.pathname
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg
      },
      {
				path: '/me',
				text: '我',
				icon: 'user',
				title: '个人中心',
				component: User
      }
    ]
    const pageInfo = navList.find(v => v.path === pathname)
    const title = pageInfo ? pageInfo.title : '404 NOT FOUND'

    const currentPage = navList.find(v => v.path === pathname)
    return (
      <div>
        <NavBar className='fixd-header' mode='dard'>{title}</NavBar>
        <div style={{marginTop:45, marginBottom: 60}}>
            <QueueAnim type='left'>
              {
                <Route key={currentPage.path} path={currentPage.path} component={currentPage.component}></Route>
              }
            </QueueAnim>
				</div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard
import React from 'react'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import {NavBar,Icon, Result} from 'antd-mobile'
import {recvMsg, getMsgList} from '../../redux/chat.redux'

import Genius from '../genius/genius'
import Boss from '../boss/boss'
import User from '../user/user'
import Msg from '../msg/msg'

const NOT_FOUNT = () => (
  <Result img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#F13642' }} />} 
  title="404 NOT FOUNT" message="啥都没有"/>
)

@connect(
  state => state,
  {recvMsg, getMsgList}
)
class Dashboard extends React.Component {
  componentDidMount() {
    this.props.recvMsg() // 监听socket推过来的消息
    this.props.getMsgList()
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
    return (
      <div>
        <NavBar className='fixd-header' mode='dard'>{title}</NavBar>
        <div style={{marginTop:45, marginBottom: 60}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
              ))}
              {
                pageInfo ? null : <Route component={NOT_FOUNT}></Route>
              }
						</Switch>
				</div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard
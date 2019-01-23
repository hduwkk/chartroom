import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '../../redux/user.redux'

@connect(
  null,
  {loadData}
)
@withRouter
class AuthRoute extends React.Component {
  componentWillMount() {
    // 获取用户信息
    // 是否登录，现在url地址 login 不需要跳转
    // 用户的type、身份
    // 信息是否完整
    console.log(this.props.location.pathname, 'pathname ...')
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) return null
    axios.get('/user/info').then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          // 有登录信息
          this.props.loadData(res.data.data)
        } else {
          this.props.history.push('/login')
        }
      }
    })
  }
  render() {
    return null
  }
}

export default AuthRoute
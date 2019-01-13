import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login, getUserData} from './Auth.redux'
import axios from 'axios'
@connect(
  state => state.auth,
  {login, getUserData}
)

class Auth extends React.Component {
  componentWillMount() {
    axios({
      method: 'get',
      url: '/data'
    }).then((data) => {
      console.log(data, '... ...')
    })
  }
  render() {
    return (
      <div>
        <h2>我的名字是{this.props.user},年龄{this.props.age}</h2>
        {this.props.isAuth ? <Redirect to='/dashboard' /> : null}
        <h2>没有权限，请先登录</h2>
        <button onClick={this.props.login}>请先登录</button>
      </div>
    )
  }
}

export default Auth

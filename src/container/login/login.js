import React from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login, clearRedirect} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

// @imoocForm
// 装饰器写法吧，类似于 Login = imoocForm(Login)

@connect(
  state => state.user,
  {login, clearRedirect}
)
@imoocForm
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  register() {
    this.props.history.push('/register')
  }

  handleLogin() {
    this.props.login(this.props.state)
  }

  componentDidMount() {
    console.log(this.props.redirectTo, '... ...')
    this.props.clearRedirect()
  }

  render() {
    const path = this.props.location.pathname
    const redirectTo = this.props.redirectTo
    return (
      <div>
        {redirectTo && redirectTo !== path ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
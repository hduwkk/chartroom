import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'

@connect(
  state => state.user,
  {register}
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'genius', // 或者boss
      user: '',
      pwd: '',
      repeatPwd: ''
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  handleRegister() {
    this.props.register(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo? <Redirect to={this.props.redirectTo} />: null}
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
            <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
            <InputItem type="password" onChange={v => this.handleChange('repeatPwd', v)}>确认密码</InputItem>
            <RadioItem onChange={() => this.handleChange('type', 'genius')}
              checked={this.state.type === 'genius'}>牛人</RadioItem>
            <RadioItem onChange={() => this.handleChange('type', 'boss')}
              checked={this.state.type === 'boss'}>BOSS</RadioItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register
import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
  state => state.user,
  {register}
)

@imoocForm
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleRegister() {
    this.props.register(this.props.state)
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo? <Redirect to={this.props.redirectTo} />: null}
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
            <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
            <InputItem type="password" onChange={v => this.props.handleChange('repeatPwd', v)}>确认密码</InputItem>
            <RadioItem onChange={() => this.props.handleChange('type', 'genius')}
              checked={this.props.state.type === 'genius'}>牛人</RadioItem>
            <RadioItem onChange={() => this.props.handleChange('type', 'boss')}
              checked={this.props.state.type === 'boss'}>BOSS</RadioItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register
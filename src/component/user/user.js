import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {Redirect} from 'react-router-dom'
import {logoutSubmit} from '../../redux/user.redux'

@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends React.Component {
  logout() {
    const Alert = Modal.alert
    Alert('注销', '确认要退出登录吗？', [
      {text: '取消', onPress() {}},
      {text: '确定', onPress: () => {
        browserCookie.erase('userid')
        this.props.logoutSubmit()
      }}
    ])
  }
  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt="" />}
          title={props.user}
          message={props.type === 'boss' ? props.company : null} />
        <List>
          <Item multipleLine>
            {props.title}
            {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
            {props.money ? <Brief>薪资：{process.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={() => this.logout()}>退出登录</Item>
        </List>
      </div>
    ) : <Redirect to={props.redirectTo} />
  }
}

export default User
import React from 'react'
import {NavBar,InputItem, TextareaItem, Button, WhiteSpace} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
@connect(
  state => state.user,
  {update}
)
class BossInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
      company: '',
      money: '',
      avatar: ''
    }
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  selectAvatar() {
    console.log(this.state, '...')
  }

  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={redirect} /> : null}
        <NavBar mode="dark" >BOSS完善信息页</NavBar>
        <AvatarSelector selectAvatar={(imgname) => {
          this.setState({avatar: imgname})
        }} />
        <InputItem onChange={v => this.onChange('title', v)} >招聘职位</InputItem>
        <InputItem onChange={v => this.onChange('company', v)} >公司名称</InputItem>
        <InputItem onChange={v => this.onChange('money', v)} >职位薪资</InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          row="3"
          autoHeight
          title="职位要求"
        ></TextareaItem>
        <WhiteSpace></WhiteSpace>
        <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
      </div>
    )
  }
}

export default BossInfo
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
class Geniusinfo extends React.Component {
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

  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={redirect} /> : null}
        <NavBar style={{backgroundColor: '#058958'}} mode="dark" >牛人完善信息页</NavBar>
        <AvatarSelector selectAvatar={(imgname) => {
          this.setState({avatar: imgname})
        }} />
        <InputItem onChange={v => this.onChange('title', v)} >求职岗位</InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          row="3"
          autoHeight
          title="个人简介"
        ></TextareaItem>
        <WhiteSpace></WhiteSpace>
        <Button style={{backgroundColor: '#058958'}} type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
      </div>
    )
  }
}

export default Geniusinfo
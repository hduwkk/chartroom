import React from 'react'
import {List, InputItem} from 'antd-mobile'
import io from 'socket.io-client'
const socket = io('ws://localhost:3456')
socket.on('recvmsg', (data) => {
  console.log('recvmsg', data)
})
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
  }
  handleSubmit() {
    socket.emit('sendmsg', {text: this.state})
    this.setState({text: ''})
  }
  render() {
    console.log(this.props)
    return (
      <div className="stick-footer">
        <InputItem
          placeholder='请输入'
          value={this.state.text}
          onChange={v => this.setState({text: v})}
          extra={<span onClick={() => this.handleSubmit()}>发送</span>}
          >
            信息
          </InputItem>
      </div>
    )
  }
}

export default Chat
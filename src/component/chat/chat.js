import React from 'react'
import { connect } from 'react-redux';
import {List, InputItem} from 'antd-mobile'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'

@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg() // 监听socket推过来的消息
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount ... ')
    // 我点开了某个消息列表
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({
      text: ''
    })
  }
  render() {
    console.log(this.props)
    return (
      <div className="stick-footer">
        <InputItem
          placeholder='😂'
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
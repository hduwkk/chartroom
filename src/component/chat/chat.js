import React from 'react'
import { connect } from 'react-redux';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {getMsgList, sendMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'

@connect(
  state => state,
  {getMsgList, sendMsg, readMsg}
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
    }
  }
  componentWillUnmount() {
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
    const emojis = '😀 🤣 😇 😍 🙃 🙄 😳 😊 💩 👌 👍 🙅‍ ❤️ 🔥 🍇 🍈 🍌 🙈 🙉 🙊 🐶'
										.split(' ')
										.filter(v=>v)
                    .map(v=>({text:v}))
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users // {[userid]: data}
    return (
      <div id="chat-page">
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
      </div>
    )
  }
}

export default Chat
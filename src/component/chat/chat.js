import React from 'react'
import { connect } from 'react-redux';
import {InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {getMsgList, sendMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
import './chat.css'

@connect(
  state => state,
  {getMsgList, sendMsg, readMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
    }
    this.fixCarousel = this.fixCarousel.bind(this)
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.fixCarousel()
    }
    // document.addEventListener('touchmove', function(e) {
      // e.preventDefault()
      // e.stopPropagation()
    // })
  }
  componentWillUnmount() {
    // 我点开了某个消息列表
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
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
    const emojis = ('😀 😃 😄 🤣 😁 😆 😇 😍 🙂 🙃 😉 🤩 😘 😋 🤑 😗 🤐 🤢 🤮 😵 😎 🙄 😳 😊 😱 ' +
                   '👀 👁 👅 👄 👶 🧒 👦 👧 🧑 👱 👨 🧔 👱 👨 👨 👨 👨 👩 👱 👩 👩 👩 👩' + 
                   '💩 👌 👍 🙅‍ ❤️ 🔥 🍇 🍈 🍌 🙈 🙉 🙊 🐶 ').split(' ')
										.filter(v=>v)
                    .map(v=>({text:v}))
    const users = this.props.chat.users
    const targetid = this.props.match.params.user
    if (!users[targetid]) return null
    const chatid = getChatId(targetid, this.props.user._id)
    const chatMsgs = this.props.chat.chatmsg.filter((item) => item.chatid === chatid) || []
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}>
          { users[targetid].name }
        </NavBar>
        {
          // chatMsgs.map((v) => {
          //   const avatar = require(`../img/${users[v.from].avatar}.png`)
          //   return v.from === targetid ?
          //     (<List key={v._id}>
          //       <Item thumb={avatar}>{v.content}</Item>
          //     </List>)
          //     : (
          //       <List key={v._id}>
          //         <Item extra={<img alt='' src={avatar} />}>{v.content}</Item>
          //       </List>
          //     )
          // })
        }
        <ul className='chat-list-wrapper'>
          {
            chatMsgs.map((v, i) => {
              const avatar = require(`../img/${users[v.from].avatar}.png`)
              // const name = users[v.from].name
              return (
                v.from === targetid ? (
                <li key={v._id} className='others'>
                  <img src={avatar} alt=""/>
                  <div className='content arrow-left'>
                    {v.content}
                  </div>
                </li>) : (
                  <li key={v._id} className='is-me'>
                    <div className='content arrow-right'>
                      {v.content}
                    </div>
                    <img src={avatar} alt=""/>
                  </li>
                )
              )
            })
          }
        </ul>
        <div className="stick-footer">
          <InputItem
            placeholder='😂'
            value={this.state.text}
            onChange={v => this.setState({text: v})}
            extra={
              <div>
                <span style={{marginRight: 15, lineHeight: '16px'}}
                  onClick={() => {
                    this.setState({showEmoji: !this.state.showEmoji})
                    this.fixCarousel()
                  }}
                  role="img" aria-label="smile"> 😃 </span>
                <span
                  onClick={() => this.handleSubmit()}>发送</span>
              </div>
            }></InputItem>
        </div>
        {
          this.state.showEmoji ? (
            <Grid
              className="chat-grid"
              data={emojis}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(el) => {
                this.setState({
                  text: this.state.text + el.text
                })
              }}
            />
          ) : null
        }
      </div>
    )
  }
}

export default Chat
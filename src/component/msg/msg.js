import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

@connect(state => state)
class Msg extends React.Component {
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userinfo = this.props.user
    const allUsers = this.props.chat.users
    const userid = userinfo._id

    const msgGroup = {}
    this.props.chat.chatmsg.forEach((v) => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup)
    return (
      <div>
        {
          chatList.map((conversitions) => {
            const c0 = conversitions[0]
            const targetId = c0.from === userid ? c0.to : c0.from
            const unread = conversitions.filter(({read}) => !read).length
            // 头像问题
            return (
              <List key={c0._id}>
                <Item
                  extra={<Badge text={unread}></Badge>}
                  thumb={require(`../img/${allUsers[targetId].avatar}.png`)}
                  arrow="horizontal"
                >
                  {c0.content}
                  <Brief>{allUsers[targetId].name}</Brief>
                </Item>
              </List>
            )
          })
        }
      </div>
    )
  }
}

export default Msg
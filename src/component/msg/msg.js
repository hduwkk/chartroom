import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
import { createSelector } from 'reselect'

const getLast = arr => arr[arr.length-1]

const cacheProp = createSelector(
  [
    state => state.user,
    state => state.chat
  ],
  (user, chat) => {
    const msgGroup = {}
    chat.chatmsg.forEach((v) => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((itemA, itemB) => {
      return getLast(itemA).create_time - getLast(itemB).create_time
    })
    console.count('sss')
    return {user, chatList, users: chat.users}
  }
)

@connect(state => cacheProp(state))
class Msg extends React.Component {
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const allUsers = this.props.users

    return (
      <div>
        {
          this.props.chatList.map((conversitions) => {
            const lastItem = getLast(conversitions)
            const targetId = lastItem.from === userid ? lastItem.to : lastItem.from
            const unread = conversitions.filter(({read, from}) => {
              return !read && from !== userid
            }).length
            // 头像问题
            return allUsers[targetId] ? (
              <List key={lastItem._id}>
                <Item
                  extra={<Badge text={unread}></Badge>}
                  thumb={require(`../img/${allUsers[targetId].avatar}.png`)}
                  arrow="horizontal"
                  onClick={() => this.props.history.push(`/chat/${targetId}`)}
                >
                  {lastItem.content}
                  <Brief>{allUsers[targetId].name}</Brief>
                </Item>
              </List>
            ) : null
          })
        }
      </div>
    )
  }
}

export default Msg
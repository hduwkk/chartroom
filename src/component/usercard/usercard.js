import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'

class UserCard extends React.Component {
  static proptypes = {
    userlist: PropTypes.array.isRequired
  }
  handleClick(user) {
    this.props.history.push(`/chat/${user.id}`)
  }
  render() {
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {
          this.props.userlist.map((item) => (
            item.avatar ? (
            <Card
              key={item._id}
              style={{marginBottom: 10}}
              onClick={() => this.handleClick(item)}
            >
              <Card.Header title={item.user} thumb={require(`../img/${item.avatar}.png`)} extra={<span>{item.title}</span>}>
              </Card.Header>
              <Card.Body>
                {item.type === 'boss' ? (<b>公司: {item.company}</b>) : null}
                {item.desc.split('\n').map((d, index) => (
                  <div key={index}>{d}</div>
                ))}
                <div>薪资: {item.money}</div>
              </Card.Body>
            </Card>): null
          ))
        }
      </WingBlank>
    )
  }
}

export default UserCard
import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
  static proptypes = {
    userlist: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(user) {
    console.log(user, 'user ... ...')
    this.props.history.push(`/chat/${user._id}`)
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
                {
                  item.money
                    ? (<div>薪资: {item.money}</div>)
                    : null
                }
              </Card.Body>
            </Card>): null
          ))
        }
      </WingBlank>
    )
  }
}

export default UserCard
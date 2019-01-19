import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'

class UserCard extends React.Component {
  static proptypes = {
    userlist: PropTypes.array.isRequired
  }
  render() {
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {
          this.props.userlist.map((item) => {
            item.avatar ? (
              <Card.Header title={item.user} thumb={require(`../img/${item.avatar}.png`)}
                extra={<span>{item.title}</span>}>
              </Card.Header>
              <Card.Body></Card.Body>
            )
          })
        }
      </WingBlank>
    )
  }
}
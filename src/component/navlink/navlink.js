import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

@connect(state => state.chat)
@withRouter
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render() {
    const navList = this.props.data.filter(v => !v.hide)
    const pathname = this.props.location.pathname

    return (
      <footer className="fixed-bottom-bar">
        <TabBar>
          {
            navList.map((v) => (
              <TabBar.Item
                key={v.path}
                badge={v.path === '/msg' ? this.props.unread : 0}
                title={v.title}
                icon={{uri: require(`./img/${v.icon}.png`)}}
                selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                selected={pathname === v.path}
                onPress={() => {
                  this.props.history.push(v.path)
                }}
              ></TabBar.Item>
            ))
          }
        </TabBar>
      </footer>
    )
  }
}

export default NavLinkBar
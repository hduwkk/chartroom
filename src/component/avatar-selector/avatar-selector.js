import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map((v) => {
        return {
          icon: require(`../img/${v}.png`),
          text: v
        }
      })
    const gridHeader = this.state.icon ? (
      <div style={{lineHeight: '20px'}}>
        <span>已选择投降</span>
        <img src={this.state.icon} style={{width: 19}} alt="" />
      </div>
    ) : '请选择头像'

    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid data={avatarList} columnNum={5} onClick={(ele) => {
            this.setState(ele)
            this.props.selectAvatar(ele.text)
          }} />
        </List>
      </div>
    )
  }
}

export default AvatarSelector
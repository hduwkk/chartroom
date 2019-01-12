import React from 'react'
import {connect} from 'react-redux'
import {addGun, removeGun, addGunAsync} from './index.redux'

@connect(
  state => ({num: state}),
  {addGun, removeGun, addGunAsync}
)

class App extends React.Component {
  render() {
    return (
      <div>
        现有机枪: {this.props.num}
        <button onClick={this.props.addGun}>增加</button>
        <button onClick={this.props.removeGun}>减少</button>
        <button onClick={this.props.addGunAsync}>异步加</button>
      </div>
    )
  }
}
// function mapStateProps(state) { return {num: state} }
// const actionCreators = {addGun, removeGun, addGunAsync}
// App = connect(mapStateProps, actionCreators)(App)

export default App

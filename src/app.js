import React from 'react'
import {Route, Switch} from 'react-router-dom'

import AuthRoute from './component/authroute/authroute'

import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  componentDidCatch() {
    console.log('error')
    this.setState({
      hasError: true
    })
  }
  render() {
    return this.state.hasError ? (<h2>出错了</h2>) :(
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={Geniusinfo}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    )
  }
}

export default App

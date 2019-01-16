// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {BrowserRouter, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

// import Auth from './Auth'
// import Dashboard from './Dashboard'

import './config'
import reducer from './reducer'
import AuthRoute from './component/authroute/authroute'

import Login from './container/login/login'
import Register from './container/register/register'

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : fn => fn
  ))

ReactDOM.render(
  (<Provider  store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
    </BrowserRouter>
  </Provider>),
document.getElementById('root'))

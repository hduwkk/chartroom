import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import './config'
import './index.css'
import reducer from './reducer'

import App from './app'

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : fn => fn
  ))

ReactDOM.render(
  (<Provider  store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>),
document.getElementById('root'))

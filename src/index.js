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
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import './config'
import Auth from './Auth'
import Dashboard from './Dashboard'
import reducer from './reducer'

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : fn => fn
  ))
console.log(store.getState(), 'store combined ... ...')
ReactDOM.render(
  (<Provider  store={store}>
    <BrowserRouter>
      <Switch>
          <Route path='/login' component={Auth}></Route>
				  <Route path='/dashboard' component={Dashboard}></Route>
				  <Redirect to='/dashboard'></Redirect>
      </Switch>
    </BrowserRouter>
  </Provider>),
document.getElementById('root'))

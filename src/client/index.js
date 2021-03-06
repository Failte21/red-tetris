import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import storeStateMiddleWare from './middleware/storeStateMiddleWare'
import socketIoMiddleWare from './middleware/socketIoMiddleware'
import io from 'socket.io-client'
import reducer from './reducers'
import {alert} from './actions/alert'
import {ping} from './actions/server'
import AppRouter from './appRouter'
import params from "../../params"

import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware'

const history = createHistory()
const initialState = {}
const socket = io(params.server.url)

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, createLogger(), socketIoMiddleWare(socket), routerMiddleware(history), errorHandlerMiddleware)
)

ReactDom.render((
  <Provider store={store}>
    <AppRouter history={history}/>
  </Provider>
), document.getElementById('tetris'))

// store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))

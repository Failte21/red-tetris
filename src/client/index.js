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

const initialState = {}

const socket = io(params.server.url)

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, createLogger(), socketIoMiddleWare(socket))
)

ReactDom.render((
  <Provider store={store}>
    <AppRouter/>
  </Provider>
), document.getElementById('tetris'))

store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))
import * as server from '../../src/server/index'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import errorHandlerMiddleware from "../../src/client/middleware/errorHandlerMiddleware";
import {routerMiddleware} from "react-router-redux";
import createHistory from 'history/createBrowserHistory'
import socketIoMiddleWare from "../../src/client/middleware/socketIoMiddleware";
import * as params from "../../params";
require('jsdom-global')()

// const io = require('socket.io').listen(params.server.port)

// export const fakeHistory = createHistory('/')

export const startServer = (params, cb) => {
  server.create(params) // is proper io getting passed too?
    .then( server => cb(null, server) )
    .catch( err => cb(err) )
}

/**
 *
 * ?? Supposed to mock our server exactly or not?
 */
export const configureStore = (reducer, socket, initialState) => createStore(
    reducer,
    initialState,
    applyMiddleware(
        socketIoMiddleWare(socket),
        errorHandlerMiddleware,
        thunk
    )
)

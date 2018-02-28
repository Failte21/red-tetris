import * as server from '../../src/server/index'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import errorHandlerMiddleware from "../../src/client/middleware/errorHandlerMiddleware";
import {routerMiddleware} from "react-router-redux";
import createHistory from 'history/createBrowserHistory'
import socketIoMiddleWare from "../../src/client/middleware/socketIoMiddleware";

const history = createHistory()

export const startServer = (params, cb) => {
  server.create(params)
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
        routerMiddleware(history),
        errorHandlerMiddleware,
        thunk
    )
)

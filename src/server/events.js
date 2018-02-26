import assert from "assert"
import debug from 'debug'
import {
    ANNOUNCE_DELETE_IN_PROGRESS_GAME, ANNOUNCE_DELETE_READY_GAME, ANNOUNCE_NEW_GAME, DELETE_ALL, JOIN_GAME, NEW_GAME,
    REMOVE_PLAYER, SERVER_ADD_PLAYER, SERVER_REMOVE_PLAYER,
    SUBSCRIBE_PLAYER
} from '../client/actions/actionTypes'
import * as gamesController from './controllers/gamesController';
import * as boardController from './controllers/boardController';

const logerror = debug('tetris:error')
    , loginfo = debug('tetris:info')

export const initEngine = io => {
    io.on('connection', function (socket) {
        loginfo("Socket connected: " + socket.id)
        socket.on('disconnect', gamesController.disconnect(socket, io))
        socket.on(SERVER_ADD_PLAYER, gamesController.joinOrCreate(socket, io))
        // TODO: Add to client side
        socket.on('SERVER_START_GAME', gamesController.onGameStart(socket, io))
    })
}
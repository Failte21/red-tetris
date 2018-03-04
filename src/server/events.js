import assert from "assert"
import debug from 'debug'
import {
    SERVER_ADD_PLAYER, SERVER_START_GAME_LOOP, SERVER_UPDATE_SPECTRE
} from '../client/actions/actionTypes'
import * as gamesController from './controllers/gamesController';

const logerror = debug('tetris:error')
    , loginfo = debug('tetris:info')

export const initEngine = io => {
    io.on('connection', function (socket) {
        loginfo("Socket connected: " + socket.id)
        socket.on('disconnect', gamesController.disconnect(socket, io))
        socket.on(SERVER_ADD_PLAYER, gamesController.joinOrCreate(socket, io))
        socket.on(SERVER_START_GAME_LOOP, gamesController.onGameStart(socket, io))
        socket.on(SERVER_UPDATE_SPECTRE, gamesController.onUpdateSpectre(socket, io))
    })
}

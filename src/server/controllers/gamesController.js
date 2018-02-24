import {ERROR, JOIN_GAME, UPDATE_GAME} from '../../client/actions/actionTypes'
import {EXISTING_USERNAME, GENERIC_ERROR} from '../../common/errors'
import {Player} from '../models/player'
import {Game} from '../models/game'

const games = []

const get = (fieldName, fieldValue) => games.find(game => game[fieldName] === fieldValue)

const getBySocketId = socketId => games.find(game => !!game.getPlayerBySocketId(socketId))

const create = (roomName, playerName, socket) => {
    const player = new Player(playerName, socket.id)
    if (!player) return socket.emit('action', {type: ERROR, payload: GENERIC_ERROR})
    const game = new Game(roomName, player)
    games.push(game)
    socket.join(roomName)
    return socket.emit('action', {type: JOIN_GAME, payload: {game: game, player}})
}

const join = (game, playerName, socket) => {
    if (game.hasPlayer(playerName)) return socket.emit('action', {type: ERROR, payload: EXISTING_USERNAME})
    const player = new Player(playerName, socket.id)
    if (!player) return socket.emit('action', {type: ERROR, payload: GENERIC_ERROR})
    game.addPlayer(player)
    socket.join(game.roomName)
    socket.to(game.roomName).emit('action', {type: UPDATE_GAME, payload: game})
    return socket.emit('action', {type: JOIN_GAME, payload: {game, player}})
}

export const joinOrCreate = socket => ({roomName, playerName}) => {
    const game = get('roomName', roomName)
    if (!game) return create(roomName, playerName, socket)
    return join(game, playerName, socket)
}

//Todo: Leave but not disconnect

export const disconnect = socket => () => {
    const game = getBySocketId(socket.id)
    if (!game) return //Todo: do we need to return anything ?
    const player = game.getPlayerBySocketId(socket.id)
    if (!player) return //Todo: do we need to return anything ?
    game.disconnectPlayer(player.playerName)
    socket.to(game.roomName).emit('action', {type: UPDATE_GAME, payload: game})
}
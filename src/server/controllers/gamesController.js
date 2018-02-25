import {ERROR, JOIN_GAME, UPDATE_GAME} from '../../client/actions/actionTypes'
import {CANNOT_CHANGE_PLAYERNAME_IN_GAME, EXISTING_USERNAME, GENERIC_ERROR} from '../../common/errors'
import {Player} from '../models/player'
import {Game} from '../models/game'
import _ from 'lodash'

import assert from 'assert'

const games = []

const get = (fieldName, fieldValue) => games.find(game => game[fieldName] === fieldValue)

const getBySocketId = socketId => games.find(game => !!game.getPlayerBySocketId(socketId))

export const joinOrCreate = (socket, io) => ({roomName, playerName}) => {
    const game = get('roomName', roomName)
    while (getBySocketId(socket.id)) disconnect(socket, io)()
    assert(!getBySocketId(socket.id), 'player with this socketid already has game')
    if (!game) return create(roomName, playerName, socket)
    return join(game, playerName, socket)
}

const create = (roomName, playerName, socket) => {
    const player = new Player(playerName, socket.id)
    if (!player) return socket.emit('action', {type: ERROR, payload: {error: GENERIC_ERROR, redirect: 'back'}})
    const game = new Game(roomName, player)
    games.push(game)
    socket.join(roomName)
    return socket.emit('action', {type: JOIN_GAME, payload: {game: game, player}})
}

const join = (game, playerName, socket) => {
    if (game.hasPlayer(playerName)) return socket.emit('action', {type: ERROR, payload: {error: EXISTING_USERNAME, redirect: 'back'}})
    const player = new Player(playerName, socket.id)
    if (!player) return socket.emit('action', {type: ERROR, payload: {error: GENERIC_ERROR, redirect: 'back'}})
    game.addPlayer(player)
    socket.join(game.roomName)
    socket.to(game.roomName).emit('action', {type: UPDATE_GAME, payload: game})
    return socket.emit('action', {type: JOIN_GAME, payload: {game, player}})
}

//Todo: Player opens another game in another window or tries to change name or re-enter old game or other weird stuff

export const disconnect = (socket, io) => () => {
    const game = getBySocketId(socket.id)
    if (!game) return//Todo: do we need to return anything ?
    const player = game.getPlayerBySocketId(socket.id)
    if (!player) return//Todo: do we need to return anything ?
    console.log(`disconnecting player ${player.playerName} from ${game.roomName}`)

    game.disconnectPlayer(player.playerName)

    if (game.leadPlayerName === player.playerName)
        game.changeLeader(0)
    if (!game.playerNames.length) _.remove(games, {roomName: game.roomName})
    io.in(game.roomName).emit('action', {type: UPDATE_GAME, payload: game})
}
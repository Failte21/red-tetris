import {
    ERROR, JOIN_GAME, NEW_GAME, REMOVE_PLAYER, START_GAME_LOOP, UPDATE_GAME,
    UPDATE_SPECTRE
} from '../../client/actions/actionTypes'
import {CANNOT_ENTER_GAME_IN_PROGRESS, EXISTING_USERNAME, GENERIC_ERROR} from '../../common/errors'
import {Player} from '../models/player'
import {Game} from '../models/game'
import * as pieceController from './pieceController'
import _ from 'lodash'

import assert from 'assert'

const games = []

const get = (fieldName, fieldValue) => games.find(game => game[fieldName] === fieldValue)
const getGameBySocketId = socketId => games.find(game => !!game.getPlayerBySocketId(socketId))

export const joinOrCreate = (socket, io) => ({roomName, playerName}) => {
    console.log(`1. ${playerName} sent to join ${roomName} by client.`)
    if (getGameBySocketId(socket.id)) removeFromPreviousGame(socket, io)
    const game = get('roomName', roomName)
    if (!game) return create(roomName, playerName, socket)
    console.log(`3. adding ${playerName} to existing game ${roomName}`)
    return join(game, playerName, socket, io)
}

export const onGameStart = (socket, io) => ({roomName}) => {
    let game = get('roomName', roomName)
    if (!game) return
    return io.in(roomName).emit('action', {type: UPDATE_GAME, payload: game.startGame() })
}

export const onUpdateSpectre = (socket, io) => ({playerName, roomName, spectreData}) => {
    let game = get('roomName', roomName)
    let player = game.getPlayerBySocketId(socket.id)
    assert(game && player, 'game or player are missing.')
    player.spectre = spectreData // will this update to game too? hope so
    io.in(roomName, {type: UPDATE_GAME, payload: game})
}

const create = (roomName, playerName, socket) => {
    console.log(`3. adding ${playerName} to new game ${roomName}`)
    const player = new Player(playerName, socket.id)
    if (!player) return socket.emit('action', {type: ERROR, payload: {errorMessage: GENERIC_ERROR, redirect: true}})
    const game = new Game(roomName, player)
    assert(game && game.getPlayerBySocketId(socket.id), 'missing game or player')
    games.push(game)
    socket.join(roomName)
    console.log('6. final players in game before telling client(s):', game.playerNames)
    return socket.emit('action', {type: UPDATE_GAME, payload: game})
}

const join = (game, playerName, socket, io) => {
    if (game.hasPlayer(playerName)) return socket.emit('action', {type: ERROR, payload: {errorMessage: EXISTING_USERNAME, redirect: true}})
    if (game.isInProgress) return socket.emit('action', {type: ERROR, payload: {errorMessage: CANNOT_ENTER_GAME_IN_PROGRESS, redirect: true}})

    const player = new Player(playerName, socket.id)
    if (!player) return socket.emit('action', {type: ERROR, payload: {errorMessage: GENERIC_ERROR, redirect: true}})
    game.addPlayer(player)
    socket.join(game.roomName)
    console.log('6. final players in game before telling client(s):', game.playerNames)
    return io.sockets.in(game.roomName).emit('action', {type: UPDATE_GAME, payload: game})
}

export const removeFromPreviousGame = (socket, io) => {
    let game = getGameBySocketId(socket.id)
    console.log(`1. unsubscribing ${game.getPlayerBySocketId(socket.id).playerName} from ${game.roomName}`)
    socket.leave(game.roomName)
    return disconnect(socket, io)()
}

export const disconnect = (socket, io) => () => {
    let game = getGameBySocketId(socket.id)
    if (!game) return
    console.log(`2. disconnecting ${game.getPlayerBySocketId(socket.id) ? game.getPlayerBySocketId(socket.id).playerName : socket.id} from ${game.roomName}`)
    game.disconnectPlayer(socket.id)
    if (game.hasPlayers) {
        console.log(`3. telling other players in ${game.roomName} that a player has left.`)
        return io.sockets.in(game.roomName).emit('action', {type: UPDATE_GAME, payload: game})
    }
    console.log(`3. deleting ${game.roomName} from games`)
    return _.remove(games, {roomName: game.roomName})
}
import {
    ERROR, JOIN_GAME, NEW_GAME, REMOVE_PLAYER, START_GAME_LOOP, UPDATE_GAME,
    UPDATE_SPECTRE
} from '../../client/actions/actionTypes'
import {EXISTING_USERNAME, GENERIC_ERROR} from '../../common/errors'
import {Player} from '../models/player'
import {Game} from '../models/game'
import * as pieceController from './pieceController'
import _ from 'lodash'

import assert from 'assert'

const games = []

const get = (fieldName, fieldValue) => games.find(game => game[fieldName] === fieldValue)
const getGameBySocketId = socketId => games.find(game => !!game.getPlayerBySocketId(socketId))

export const joinOrCreate = (socket, io) => ({roomName, playerName}) => {
    if (getGameBySocketId(socket.id)) removeFromPreviousGame(socket, io)
    const game = get('roomName', roomName)
    if (!game) return create(roomName, playerName, socket)
    return join(game, playerName, socket)
}

export const onGameStart = (socket, io) => ({roomName}) => {
    let game = get('roomName', roomName)
    if (!game) return
    game.startGame()
    return io.in(roomName).emit('action', {type: START_GAME_LOOP, payload: {game, player: game.getPlayerBySocketId(socket.id)} })
}

export const onUpdateSpectre = (socket, io) => ({playerName, roomName, spectreData}) => {
    socket.to(roomName, {type: UPDATE_SPECTRE, payload: {playerName, spectreData}})
}

const create = (roomName, playerName, socket) => {
    const player = new Player(playerName, socket.id)
    if (!player) return socket.emit('action', {type: ERROR, payload: {errorMessage: GENERIC_ERROR, redirect: true}})
    const game = new Game(roomName, player)
    assert(game && game.getPlayerBySocketId(socket.id), 'missing game or player')
    games.push(game)
    socket.join(roomName)
    return socket.emit('action', {type: NEW_GAME, payload: {game, player }})
}

const join = (game, playerName, socket) => {
    if (game.hasPlayer(playerName)) return socket.emit('action', {type: ERROR, payload: {errorMessage: EXISTING_USERNAME, redirect: true}})
    const player = new Player(playerName, socket.id)
    if (!player) return socket.emit('action', {type: ERROR, payload: {errorMessage: GENERIC_ERROR, redirect: true}})
    game.addPlayer(player)
    socket.join(game.roomName)
    socket.to(game.roomName).emit('action', {type: UPDATE_GAME, payload: game})
    return socket.emit('action', {type: JOIN_GAME, payload: {game, player}})
}

export const removeFromPreviousGame = (socket, io) => {
    let game = getGameBySocketId(socket.id)
    assert(game, 'trying to disconnect player from game that does not exist.')
    socket.leave(game.roomName)
    return disconnect(socket, io)()
}

export const disconnect = (socket, io) => () => {
    let game = getGameBySocketId(socket.id)
    if (!game) return
    game.disconnectPlayer(socket.id)
    if (game.hasPlayers)
        return io.in(game.roomName).emit('action', {type: REMOVE_PLAYER, payload: game})
    else return _.remove(games, {roomName: game.roomName})
}
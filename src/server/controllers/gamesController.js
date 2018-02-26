import {ERROR, JOIN_GAME, NEW_GAME, REMOVE_PLAYER, UPDATE_GAME} from '../../client/actions/actionTypes'
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
    const game = get('roomName', roomName)
    if (getGameBySocketId(socket.id)) removeFromPreviousGame(socket, io)
    if (!game) return create(roomName, playerName, socket)
    return join(game, playerName, socket)
}

export const onGameStart = (socket, io) => ({roomName}) => {
    const game = get('roomName', roomName)
    if (!game) return
    game.addToPieceLineup(pieceController.generatePieceList(50))
    // start game loop
}

const create = (roomName, playerName, socket) => {
    const player = new Player(playerName, socket.id)
    if (!player) return socket.emit('action', {type: ERROR, payload: {errorMessage: GENERIC_ERROR, redirect: true}})
    const game = new Game(roomName, player)
    games.push(game)
    socket.join(roomName)
    return socket.emit('action', {type: NEW_GAME, payload: {game: game, player}})
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

// TODO: Refactor to make not the same thing as disconnect
export const removeFromPreviousGame = (socket, io) => {
    const game = getGameBySocketId(socket.id)
    if (!game) return
    const player = game.getPlayerBySocketId(socket.id)
    if (!player) return
    console.log(`disconnecting player ${player.playerName} from ${game.roomName}`)
    socket.leave(game.roomName)
    game.disconnectPlayer(player.playerName)
    if (game.leadPlayerName === player.playerName)
        game.changeLeader(0)
    if (!game.playerNames.length) _.remove(games, {roomName: game.roomName})
    socket.to(game.roomName).emit('action', {type: REMOVE_PLAYER, payload: game})
}

//TODO: Idem
export const disconnect = (socket) => () => {
    const game = getGameBySocketId(socket.id)
    if (!game) return
    const player = game.getPlayerBySocketId(socket.id)
    if (!player) return
    console.log(`disconnecting player ${player.playerName} from ${game.roomName}`)

    game.disconnectPlayer(player.playerName)
    if (game.leadPlayerName === player.playerName)
        game.changeLeader(0)
    if (!game.playerNames.length) return _.remove(games, {roomName: game.roomName})
    assert(game, 'game exists')
    socket.to(game.roomName).emit('action', {type: REMOVE_PLAYER, payload: game})
}
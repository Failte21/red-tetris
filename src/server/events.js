import assert from "assert"
import debug from 'debug'
import {JOIN_GAME, NEW_GAME, REMOVE_PLAYER, SUBSCRIBE_PLAYER } from "../client/actions/actionTypes"
import {Games} from "./models"

const logerror = debug('tetris:error')
    , loginfo = debug('tetris:info')

const games = new Games()

const removePlayerFromRoom = (payload, socket) => {
    const { playerName, boardName } = payload
    const player = games.getPlayerByName(playerName)
    const previousGameName = player.currentBoardName || ''
    if (previousGameName && previousGameName !== boardName) {
        socket.leave(previousGameName)
        games.disconnectPlayerFromGame(playerName, previousGameName)
        // if (!this.getGameByBoardName(previousGameName).leadPlayerName)
            // delete game and tell everyone
        socket.to(previousGameName).emit('action', {type: REMOVE_PLAYER, payload: playerName})
    }
}

const addPlayer = (payload, socket) => {
    const { boardName, playerName } = payload
    const gameCheck = games.getGameByBoardName(boardName)
    const playerCheck = games.getPlayerByName(playerName)
    if (gameCheck && playerCheck && playerCheck.currentBoardName === boardName) {
        return null
    }

    if (!playerCheck)
        games.newPlayer(playerName, socket.id)

    const player = games.getPlayerByName(playerName)
    if (player.currentBoardName) removePlayerFromRoom(payload, socket)
    // socket.join(boardName)
    const type = gameCheck ? JOIN_GAME : NEW_GAME
    if (type === NEW_GAME) {
        games.newGame(boardName, playerName, socket.id)
    } else {
        games.addPlayerToGame(playerName, boardName)
    }

    const action = {
        type,
        payload: {
            game: games.getGameByBoardName(boardName),
            player,
            meta: games.games
        }
    }
    socket.emit('action', {type: SUBSCRIBE_PLAYER, payload: player})
    socket.to(boardName).emit('action', action)
    return socket.emit('action', action)
}

const deletePlayer = (socket) => {
    loginfo("Socket disconnected: " + socket.id)
    const player = games.getPlayerBySocketId(socket.id)
    if (!player) return
    const {currentBoardName, playerName} = player
    if (currentBoardName) {
        socket.leave(currentBoardName)
        games.disconnectPlayerFromGame(playerName, currentBoardName)
        // delete game and tell everyone
    }
    games.deletePlayer(playerName)
    if (currentBoardName)
        socket.to(currentBoardName).emit('action', {type: REMOVE_PLAYER, payload: playerName})
}

export const events = (socket, io) => {
    socket.on('SERVER_PING', () => (socket.emit('action', {type: 'pong'})))
    socket.on('SERVER_ADD_PLAYER', (payload) => addPlayer(payload, socket))
    socket.on('SERVER_REMOVE_PLAYER', (payload) => removePlayerFromRoom(payload, socket))
    socket.on('disconnect', (socket) => deletePlayer(socket))
    socket.on('subscribe', (payload) => socket.join(payload.room))
}

export const initEngine = io => {
    io.on('connection', function (socket) {
        loginfo("Socket connected: " + socket.id)
        events(socket, io)
    })
    //     socket.on('action', (action) => {
    //         events(socket, action)
    //     })
    //     socket.on('disconnect', () => {
    //         const player = games.getPlayerBySocketId(socket.id)
    //         if (!player) return;
    //         const {currentBoardName, playerName} = player
    //         const game = games.getGameByBoardName(currentBoardName)
    //         games.removePlayer(playerName)
    //         games.removeGame()
    //         game.removePLayer(playerName)
    //         if (!game.playerNames.length) {
    //             games.removeGame(currentBoardName)
    //         }
    //         socket.to(currentBoardName).emit('action', {type: REMOVE_PLAYER, payload: playerName})
    //     })
    // })
}
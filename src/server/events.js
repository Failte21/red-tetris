import assert from "assert"
import debug from 'debug'
import {
    ANNOUNCE_DELETE_IN_PROGRESS_GAME, ANNOUNCE_DELETE_READY_GAME, ANNOUNCE_NEW_GAME, JOIN_GAME, NEW_GAME, REMOVE_PLAYER,
    SUBSCRIBE_PLAYER
} from "../client/actions/actionTypes"
import {Games} from "./models"

const logerror = debug('tetris:error')
    , loginfo = debug('tetris:info')

const games = new Games()

const removePlayerFromRoom = (payload, socket, io) => {
    console.log('Removing player from room')
    const { playerName, roomName } = payload
    const player = games.getPlayerByName(playerName)
    const prevRoomName = player.currentRoomName || ''
    loginfo(`previous game: ${prevRoomName}`)
    if (prevRoomName && prevRoomName !== roomName) {
        socket.leave(prevRoomName)
        games.disconnectPlayerFromGame(playerName, prevRoomName)
        if (!games.getGameByRoomName(prevRoomName).leadPlayerName) {
            const wasInProgress = games.getGameByRoomName(prevRoomName).hasStarted
            games.removeGame(prevRoomName)
            io.emit('action', {type: wasInProgress ? ANNOUNCE_DELETE_IN_PROGRESS_GAME: ANNOUNCE_DELETE_READY_GAME, payload: { roomName: prevRoomName}})
        } else {
            socket.to(prevRoomName).emit('action', {type: REMOVE_PLAYER, payload: playerName})
        }
    }
}

const newGame = (payload, socket, io) => {
    games.newGame(payload.roomName, payload.playerName, socket.id)
    io.emit('action', {type: ANNOUNCE_NEW_GAME, payload: {roomName: payload.roomName}})
    const player = games.getPlayerByName(payload.playerName)
    const game = games.getGameByRoomName(payload.roomName)
    socket.emit('action', {type: SUBSCRIBE_PLAYER, payload: player})
    return socket.emit('action', {type: NEW_GAME, payload: {game, player }})
}

const joinGame = (payload, socket, io) => {
    games.addPlayerToGame(payload.playerName, payload.roomName)
    const player = games.getPlayerByName(payload.playerName)
    const game = games.getGameByRoomName(payload.roomName)
    socket.emit('action', {type: SUBSCRIBE_PLAYER, payload: player})
    socket.to(payload.roomName).emit('action', {type: JOIN_GAME, payload: {game, player}})
    return socket.emit('action', {type: JOIN_GAME, payload: {game, player}})
}

const onPlayerEnterRoom = (payload, socket, io) => {
    const { roomName, playerName } = payload
    const gameCheck = games.getGameByRoomName(roomName)
    const playerCheck = games.getPlayerByName(playerName)
    if (gameCheck && playerCheck && playerCheck.currentRoomName === roomName) {
        console.log('Player already in room.')
        return null
    }

    if (!playerCheck)
        games.newPlayer(playerName, socket.id)


    if (playerCheck && playerCheck.currentRoomName) {
        console.log(`removing ${playerName} from previous room`)
        removePlayerFromRoom(payload, socket, io)
    }

    return gameCheck ? joinGame(payload, socket) : newGame(payload, socket, io)
}

const deletePlayer = (socket, io) => {
    loginfo("Socket disconnected: " + socket.id)
    const player = games.getPlayerBySocketId(socket.id)

    // if player has no username, we do not care.
    if (!player) return
    const {currentRoomName, playerName} = player
    if (currentRoomName) {
        removePlayerFromRoom({playerName, roomName: currentRoomName}, socket, io)
    }
    games.deletePlayer(playerName)
}

export const initEngine = io => {
    io.on('connection', function (socket) {
        loginfo("Socket connected: " + socket.id)
        socket.on('SERVER_PING', () => (socket.emit('action', {type: 'pong'})))
        socket.on('SERVER_ADD_PLAYER', (payload) => onPlayerEnterRoom(payload, socket, io))
        socket.on('SERVER_REMOVE_PLAYER', (payload) => removePlayerFromRoom(payload, socket, io))
        socket.on('subscribe', (payload) => socket.join(payload.room))
        socket.on('disconnect', () => deletePlayer(socket, io))
    })
    //     socket.on('action', (action) => {
    //         events(socket, action)
    //     })
    //     socket.on('disconnect', () => {
    //         const player = games.getPlayerBySocketId(socket.id)
    //         if (!player) return;
    //         const {currentRoomName, playerName} = player
    //         const game = games.getGameByRoomName(currentRoomName)
    //         games.removePlayer(playerName)
    //         games.removeGame()
    //         game.removePLayer(playerName)
    //         if (!game.playerNames.length) {
    //             games.removeGame(currentRoomName)
    //         }
    //         socket.to(currentRoomName).emit('action', {type: REMOVE_PLAYER, payload: playerName})
    //     })
    // })
}
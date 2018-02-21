import debug from 'debug'
import {JOIN_GAME, NEW_GAME, REMOVE_PLAYER, SUBSCRIBE_PLAYER} from "../client/actions/actionTypes"
import {Games} from "./models"

const logerror = debug('tetris:error')
    , loginfo = debug('tetris:info')

const games = new Games()

export const events = (socket, action) => {
    switch (action.type) {
        case ('SERVER_PING'):
            return socket.emit('action', {type: 'pong'})
        case ('SERVER_ADD_PLAYER'):
            const { boardName, playerName } = action.payload
            const gameCheck = games.getGameByBoardName(boardName)
            const playerCheck = games.getPlayerByName(playerName)
            if (gameCheck && playerCheck && playerCheck.currentBoardName === boardName) {
                return
            }

            if (!playerCheck)
                games.newPlayer(playerName, socket.id)

            const player = games.getPlayerByName(playerName)
            socket.join(boardName)
            const type = gameCheck ? JOIN_GAME : NEW_GAME
            if (type === NEW_GAME) {
                games.newGame(boardName, playerName, socket.id)
            } else {
                games.addPlayerToGame(playerName, boardName)
            }

            //Todo: rename
            const action_2 = {
                type,
                payload: {
                    game: games.getGameByBoardName(boardName),
                    player,
                    meta: games.games
                }
            }
            socket.emit('action', {type: SUBSCRIBE_PLAYER, payload: player})
            socket.to(boardName).emit('action', action_2)
            return socket.emit('action', action_2)
        default:
            return;
    }
}

export const initEngine = io => {
    io.on('connection', function (socket) {
        loginfo("Socket connected: " + socket.id)
        socket.on('action', (action) => {
            events(socket, action)
        })
        socket.on('disconnect', () => {
            const player = games.getPlayerBySocketId(socket.id)
            if (!player) return;
            const {currentBoardName, playerName} = player
            const game = games.getGameByBoardName(currentBoardName)
            games.removePlayer(playerName)
            games.removeGame()
            game.removePLayer(playerName)
            if (!game.playerNames.length) {
                games.removeGame(currentBoardName)
            }
            socket.to(currentBoardName).emit('action', {type: REMOVE_PLAYER, payload: playerName})
        })
    })
}
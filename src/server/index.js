import fs  from 'fs'
import debug from 'debug'
import { Games, Player, Game } from './models'

import _ from 'lodash'
import {JOIN_GAME, NEW_GAME, REMOVE_PLAYER, SUBSCRIBE_PLAYER} from '../client/actions/actionTypes'

const logerror = debug('tetris:error')
    , loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
    const {host, port} = params
    const handler = (req, res) => {
        const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
        fs.readFile(__dirname + file, (err, data) => {
            if (err) {
                logerror(err)
                res.writeHead(500)
                return res.end('Error loading index.html')
            }
            res.writeHead(200)
            res.end(data)
        })
    }

    app.on('request', handler)

    app.listen({host, port}, () => {
        loginfo(`tetris listen on ${params.url}`)
        cb()
    })
}

const games = new Games()

const events = (socket, action) => {
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

            // socket.join(boardName)
            // if (!gameCheck) {
            //     games.newGame(boardName, playerName, socket.id)
            //     return socket.emit('action', {
            //         type: NEW_GAME,
            //         payload: {
            //             game: games.getGameByBoardName(boardName),
            //             player: games.getPlayerByName(playerName),
            //             meta: games.games
            //         }
            //     })
            // } else {
            //     games.addPlayerToGame(playerName, boardName)
            //
            //     //ugh
            //     const action = {
            //         type: JOIN_GAME,
            //         payload: {
            //             game: games.getGameByBoardName(boardName),
            //             player: games.getPlayerByName(playerName),
            //             meta: games.games
            //         }
            //     }
            //     socket.emit('action', action)
            //     return socket.to(boardName).emit('action', action)
            // }

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

const initEngine = io => {
    io.on('connection', function(socket){
        loginfo("Socket connected: " + socket.id)
        socket.on('action', (action) => {
            events(socket, action)
        })
        socket.on('disconnect', () => {
            const player = games.getPlayerBySocketId(socket.id)
            const { currentBoardName, playerName } = player
            const game = games.getGameByBoardName(currentBoardName)
            games.removePlayer(playerName)
            games.removeGame()
            game.removePLayer(playerName)
                if (!game.playerNames.length) {
                    games.removeGame(currentBoardName)
                        }
            socket.to(currentBoardName).emit('action', {type: REMOVE_PLAYER,payload: playerName})
        })
    })
}

export function create(params){
    const promise = new Promise( (resolve, reject) => {
        const app = require('http').createServer()
        initApp(app, params, () =>{
            const io = require('socket.io')(app)
            const stop = (cb) => {
                io.close()
                app.close( () => {
                    app.unref()
                })
                loginfo(`Engine stopped.`)
                cb()
            }

            initEngine(io)
            resolve({stop})
        })
    })
    return promise
}

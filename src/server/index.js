import fs  from 'fs'
import debug from 'debug'
import { Games, Player, Game } from './models'

import _ from 'lodash'

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

  app.listen({host, port}, () =>{
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}

const games = new Games()

const events = (socket, action) => {
  const { type } = action
  switch (action.type) {
      case ('SERVER_PING'):
        return socket.emit('action', {type: 'pong'})
      case ('SERVER_ADD_PLAYER'):
        const { boardName, playerName } = action.payload
        if (!games.getGameByBoardName(boardName)) {
          games.newGame(boardName, playerName, socket.id)
          socket.emit('action', {type: 'NEW_GAME', payload: games.getGameByBoardName(boardName)})
        } else {
          games.newPlayer(playerName, socket.id)
          games.addPlayerToGame(playerName, boardName)
          socket.emit('action', {type: 'JOIN_GAME', payload: games.getGameByBoardName(boardName)})
        }
        break;
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

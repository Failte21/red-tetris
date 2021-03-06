import chai from "chai"
import {startServer} from "./helpers/server";
import * as params from "../params";
import clientIo from 'socket.io-client'
import {SERVER_ADD_PLAYER, UPDATE_GAME} from "../src/client/actions/actionTypes";

import _ from 'lodash'

const assert = chai.assert
const expect = chai.expect
const should = chai.should()

let player1
let player2

const examples = {
    'SERVER_ADD_PLAYER': {
        validPlayer1: {
            roomName: 'room1408', playerName: 'lsimon'
        },
        validPlayer2: {
            roomName: 'room1408', playerName: 'ekelen'
        }
    }
}

describe('game state updates via websockets', function() {
    let mockServer
    beforeEach(cb => startServer( params.test, function(err, server){
        console.log("BEFORE")
        mockServer = server
        player1 = clientIo(params.test.url)
        player2 = clientIo(params.test.url)
        cb()
    }))
    afterEach(function (done) {
        player1.disconnect()
        player2.disconnect()
        mockServer.stop(done)
        console.log("AFTER")
    })

    // describe('connecting players', function(){
    it('creating new room should trigger UPDATE_ROOM with payload with correct roomname and leadername', function(done){
        player1.emit(SERVER_ADD_PLAYER, examples.SERVER_ADD_PLAYER.validPlayer1)
        const { roomName, playerName } = examples.SERVER_ADD_PLAYER.validPlayer1
        player1.on('action', (action) => {
            expect(action).to.deep.include({type: UPDATE_GAME})
            expect(action.payload).to.deep.include({roomName, leadPlayerName: playerName})
            done()
        })
    })

    it('joining an existing room should send UPDATE_ROOM to everyone in the room.', function(done){
        player1.emit(SERVER_ADD_PLAYER, examples.SERVER_ADD_PLAYER.validPlayer1)
        player1.on('action', (action) => {
            expect(action).to.deep.include({type: UPDATE_GAME})
            player2.emit(SERVER_ADD_PLAYER, examples.SERVER_ADD_PLAYER.validPlayer2)
            player1.on('action', (action) => {
                expect(action).to.deep.include({type: UPDATE_GAME})
                done()
            })
        })
    })


    // })
})






/**
 * I realized writing this idk what it's supposed to be testing
 * (the middleware exists? that it works? that the server config works?
 *
 */

// describe('server test', function() {
//     let mockServer
//         before(cb => startServer( params.test, function(err, server){
//         mockServer = server
//         cb()
//     }))
//
//     after(function(done){mockServer.stop(done)})
//
//   it('should pong on SERVER_PING', function(done){
//     const initialState = {}
//     const socket = io(params.test.url)
//     const store =  configureStore(reducer, socket, initialState)
//     store.dispatch(ping())
//   });
// });


/**
 * Original RP test below
 */

// import chai from "chai"
// import {startServer, configureStore} from './helpers/server'
// import rootReducer from '../src/client/reducers'
// import {ping} from '../src/client/actions/server'
// import io from 'socket.io-client'
// import params from '../params'
//
// chai.should()
//
// describe('Fake server test', function(){
//   let tetrisServer
//   before(cb => startServer( params.test, function(err, server){
//     tetrisServer = server
//     cb()
//   }))
//
//   after(function(done){tetrisServer.stop(done)})
//
//   it('should pong', function(done){
//     const initialState = {}
//     const socket = io(params.test.url)
//     const store =  configureStore(rootReducer, socket, initialState, {
//       'pong': () =>  done()
//     })
//     store.dispatch(ping())
//   });
// });

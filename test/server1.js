import chai from "chai"
import {configureStore, startServer} from "./helpers/server";
import * as params from "../params";
import clientIo from 'socket.io-client'
import reducer from "../src/client/reducers/alert";
import {ping} from "../src/client/actions/server";
import {SERVER_ADD_PLAYER, UPDATE_GAME} from "../src/client/actions/actionTypes";
const initialState = {}

import _ from 'lodash'

const assert = chai.assert
const expect = chai.expect
const should = chai.should()

let player1
let player2

const examples = {
    'SERVER_ADD_PLAYER': [
        {
            desc: 'player1 valid',
            payload: {roomName: 'room1408', playerName: 'lsimon'}
        },
        {
            desc: 'player2 valid',
            payload: {roomName: 'room1408', playerName: 'ekelen'}
        }
    ]
}

describe('game state updates via websockets', function() {
    let mockServer
    before(cb => startServer( params.server, function(err, server){
        mockServer = server
        player1 = clientIo(params.server.url)
        player2 = clientIo(params.server.url)
        cb()
    }))
    after(function (done) {
        player1.disconnect()
        player2.disconnect()
        mockServer.stop(done)
    })

    describe('connecting players', function(){
        it('creating new room should trigger UPDATE_ROOM.', function(done){
            player1.emit(SERVER_ADD_PLAYER, examples.SERVER_ADD_PLAYER[0].payload)
            player1.on('action', (action) => {
                expect(action).to.deep.include({type: UPDATE_GAME})
                expect(action).to.have.property('payload')
                done()
            })
        })
    })
})






/**
 * I realized writing this idk what it's supposed to be testing
 * (the middleware exists? that it works? that the server config works?
 *
 */

// describe('server test', function() {
//     let mockServer
//         before(cb => startServer( params.server, function(err, server){
//         mockServer = server
//         cb()
//     }))
//
//     after(function(done){mockServer.stop(done)})
//
//   it('should pong on SERVER_PING', function(done){
//     const initialState = {}
//     const socket = io(params.server.url)
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
//   before(cb => startServer( params.server, function(err, server){
//     tetrisServer = server
//     cb()
//   }))
//
//   after(function(done){tetrisServer.stop(done)})
//
//   it('should pong', function(done){
//     const initialState = {}
//     const socket = io(params.server.url)
//     const store =  configureStore(rootReducer, socket, initialState, {
//       'pong': () =>  done()
//     })
//     store.dispatch(ping())
//   });
// });

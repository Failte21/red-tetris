import {configureStore} from './helpers/server'
import reducer from '../src/client/reducers'
import chai from "chai"
import playerReducer, {emptyPlayer} from "../src/client/reducers/playerReducer";
import {ERROR, UPDATE_PLAYER} from "../src/client/actions/actionTypes";
import {BOARD} from "../src/common/game";

const assert = chai.assert
const expect = chai.expect
const should = chai.should()

const examples = {
    emptyPlayer: emptyPlayer,
    validPlayer1: {
        playerName: 'jane',
        socketId: 'abcdefg12345678',
        isPlaying: true,
        spectre: BOARD.EMPTY_NEW_BOARD
    },
    validPlayer2: {
        playerName: 'steve',
        socketId: 'zyxwv9876',
        isPlaying: false,
        spectre: BOARD.EMPTY_NEW_BOARD
    }
}

describe('player reducer', function(){
    it('should return current state when action is undefined', () => {
        expect(playerReducer(examples.emptyPlayer, {})).to.eql(examples.emptyPlayer)
        expect(playerReducer(examples.validPlayer1, {})).to.eql(examples.validPlayer1)
    })
    it('should return a deep clone of payload on UPDATE_PLAYER', () => {
        expect(playerReducer(examples.emptyPlayer, {
            type: UPDATE_PLAYER, payload: examples.validPlayer1}))
            .to.eql(examples.validPlayer1)
        expect(playerReducer(examples.validPlayer1, {
            type: UPDATE_PLAYER, payload: examples.validPlayer2}))
            .to.eql(examples.validPlayer2)
    })
    it('should revert to empty player (default state) on ERROR with redirect', () => {
        expect(playerReducer(examples.validPlayer1, {
            type: ERROR, payload: {
                errorMessage: 'some error', redirect: 'true' }}))
            .to.eql(examples.emptyPlayer)
    })
    it('should keep current state on ERROR with NO redirect', () => {
        expect(playerReducer(examples.validPlayer1, {
            type: ERROR, payload: {
                errorMessage: 'some error', redirect: 'false' }}))
            .to.eql(examples.validPlayer1)
    })
});

/**
 * boilerplate
 */
// import {configureStore} from './helpers/server'
// import rootReducer from '../src/client/reducers'
// import {ALERT_POP, alert} from '../src/client/actions/alert'
// import chai from "chai"
//
// const MESSAGE = "message"
//
// chai.should()
//
// describe('Fake redux test', function(){
//     it('alert it', function(done){
//         const initialState = {}
//         const store =  configureStore(rootReducer, null, initialState, {
//             ALERT_POP: ({dispatch, getState}) =>  {
//                 const state = getState()
//                 state.message.should.equal(MESSAGE)
//                 done()
//             }
//         })
//         store.dispatch(alert(MESSAGE))
//     });
//
// });

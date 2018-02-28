import {configureStore} from './helpers/server'
import reducer from '../src/client/reducers'
import chai from "chai"
import playerReducer, {emptyPlayer} from "../src/client/reducers/playerReducer";
import {UPDATE_PLAYER} from "../src/client/actions/actionTypes";
import {BOARD} from "../src/common/game";

const assert = chai.assert
const expect = chai.expect
const should = chai.should()

const examples = [
    {desc: 'empty player', payload: emptyPlayer },
    {desc: 'valid player', payload: {
        playerName: 'jane',
        socketId: 'abcdefg12345678',
        isPlaying: true,
        spectre: BOARD.EMPTY_NEW_BOARD
        }
    }
]

describe('player reducer', function(){
    it('state is an empty player when action is undefined', () => {
        expect(playerReducer(undefined, {})).to.eql(emptyPlayer)
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

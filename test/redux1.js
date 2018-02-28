import {configureStore} from './helpers/server'
import reducer from '../src/client/reducers'
import chai from "chai"
import playerReducer, {emptyPlayer} from "../src/client/reducers/playerReducer";

const assert = chai.assert
const expect = chai.expect
const should = chai.should()

describe('player reducer', function(){
    // it('should put an error message in the store', function(){
    //     const initialState = {}
    //     const store =  configureStore(reducer, null, initialState)
    //     expect()
    // });

    it('should return the initial state', () => {
        expect(playerReducer(undefined, {})).toEqual(emptyPlayer)
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

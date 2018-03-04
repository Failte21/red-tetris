import chai from "chai"
import {checkValidHashURL} from "../src/client/utils/inputValidation"
import {INVALID_PLAYER_NAME, INVALID_ROOM_NAME, INVALID_URL_PARAMS} from "../src/common/errors"

const assert = chai.assert
const expect = chai.expect
const should = chai.should()

const urlTests = [
    {type: 'ok', input: '42[ekelen]', expectedError: null},
    {type: 'ok with underscores', input: 'roomname[user]', expectedError: null},
    {type: 'no parameters', input: '', expectedError: INVALID_URL_PARAMS},
    {type: 'missing username', input: '42[]', expectedError: INVALID_PLAYER_NAME},
    {type: 'bad username', input: '42[#::#]', expectedError: INVALID_PLAYER_NAME},
    {type: 'missing roomname', input: '[user]', expectedError: INVALID_ROOM_NAME},
    {type: 'bad roomname', input: '*&SDF[user]', expectedError: INVALID_ROOM_NAME},
]

describe('checkValidHashURL', () => {
    urlTests.forEach(t => {
        it(`an input that is ${t.type} should return error of type ${t.expectedError}`, done => {
            let res = checkValidHashURL(t.input)
            expect(res).to.have.property('roomName')
            expect(res).to.have.property('playerName')
            expect(res).to.have.property('error').to.equal(t.expectedError)
            done()
        })
    })
})

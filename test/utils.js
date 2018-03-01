import chai from "chai"
import _ from 'lodash'
import {getSpectreFromMatrix, getVisibleBoard} from "../src/common/game";

const assert = chai.assert
const expect = chai.expect
const should = chai.should()

// making samples 1/2 normal size for readability
// 5 * 12 (incl 2 hidden rows on top)
const examples = {
    validBoardInProgress: {
        data :
            [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 4, 4]],
        desc: 'valid board with some values > 0'
    },
    validEmptyBoard: {
        data :
            [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            ],
        desc: 'valid matrix with all 0s'
    },
}

describe('getVisibleBoard(boardData)', () => {
    for (let eg in examples) {
        it(`returns only visible rows of a ${examples[eg].desc}`, done => {
            expect(getVisibleBoard(examples[eg].data)).to.have.lengthOf(examples[eg].data.length - 2)
            expect(_.last(getVisibleBoard(examples[eg].data))).to.eql(_.last(examples[eg].data))
            expect(getVisibleBoard(examples[eg].data)[0]).to.eql(examples[eg].data[2])
            done()
        })
    }
})

describe('getSpectreFromMatrix(visibleBoardData', () => {
    let spectre
    let visibleEmptyBoard = getVisibleBoard(examples.validEmptyBoard.data)
    let visibleInProgressBoard = getVisibleBoard(examples.validBoardInProgress.data)
    it (`if given matrix of 0s, returns a string of 'null' that is same length as matrix width.`, () => {
        spectre = getSpectreFromMatrix(visibleEmptyBoard)
        expect(spectre).to.have.lengthOf(visibleEmptyBoard[0].length)
        assert(spectre.every(val => _.isNull(val)), 'not every val is null')
    })
    it(`if given matrix which contains no values > 0 in first col, will return array with null in first column only.`, () => {
        spectre = getSpectreFromMatrix(visibleInProgressBoard)
        assert(_.isNull(spectre[0]) && spectre.slice(1).every(val => !_.isNull(val)), 'not an array with only first value as null')
    })
})

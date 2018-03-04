import chai from "chai"
import _ from 'lodash'
import {getSpectreFromMatrix} from "../src/client/utils/geometry";
import {getVisibleBoard} from "../src/client/utils/geometry";

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
        it(`chops off hidden layers from a ${examples[eg].desc}`, done => {
            expect(getVisibleBoard(examples[eg].data)).to.have.lengthOf(examples[eg].data.length - 2)
            expect(_.last(getVisibleBoard(examples[eg].data))).to.eql(_.last(examples[eg].data))
            expect(getVisibleBoard(examples[eg].data)[0]).to.eql(examples[eg].data[2])
            done()
        })
    }
})

describe('getSpectreFromMatrix(visibleBoardData', () => {
    let spectre
    let emptyBoard = examples.validEmptyBoard.data
    let inProgressBoard = examples.validBoardInProgress.data
    it (`if given matrix of 0s, returns a string of 'null' that is same length as matrix width.`, () => {
        spectre = getSpectreFromMatrix(emptyBoard)
        expect(spectre).to.have.lengthOf(emptyBoard[0].length)
        assert(spectre.every(val => _.isNull(val)), 'not every val is null')
    })
    it(`if given matrix which contains no values > 0 in first col, will return array with null in first column only.`, () => {
        spectre = getSpectreFromMatrix(inProgressBoard)
        assert(_.isNull(spectre[0]) && spectre.slice(1).every(val => !_.isNull(val)), 'not an array with only first value as null')
    })
})

import chai from "chai"
import _ from 'lodash'
import {getSpectreFromMatrix, getVisibleBoard, TETROS} from "../src/common/game";
import {pieceToShape, rotate, shapeToPiece} from "../src/client/utils/geometry";

const assert = chai.assert
const expect = chai.expect
const should = chai.should()

const PIECES = TETROS.PIECES

const examples = {
    I: {
        piece: [[0,1],[1,1],[2,1],[3,1]],
        shape: [
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0],
        ],
        rotated: {
            piece: [[2,0],[2,1],[2,2],[2,3]],
            shape: [[0, 0, 1, 0],
                    [0, 0, 1, 1],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0]]
        }
    },
    J: {
        piece: [[0,1],[1,1],[2,1],[0,0]],
        shape: [
            [ 1, 0, 0, 0 ],
            [ 1, 1, 1, 0 ],
            [ 0, 0, 0, 0 ],
            [ 0, 0, 0, 0 ] ],
        rotated: {
            piece: {},
            shape: [ [ 0, 0, 1, 1 ], [ 0, 0, 1, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 0, 0 ] ]
        }
    }
}

const logShape = (shape) => {
    shape.forEach((row) => {
        console.log(row)
    })
}

//console.log(pieceToShape(examples.J.piece))
console.log(shapeToPiece(rotate(examples.J.shape)))

// describe('pieceToShape(piece)', () => {
//     for (let eg in examples) {
//         it(`returns only visible rows of a ${examples[eg].desc}`, done => {
//             expect(getVisibleBoard(examples[eg].data)).to.have.lengthOf(examples[eg].data.length - 2)
//             expect(_.last(getVisibleBoard(examples[eg].data))).to.eql(_.last(examples[eg].data))
//             expect(getVisibleBoard(examples[eg].data)[0]).to.eql(examples[eg].data[2])
//             done()
//         })
//     }
// })
//
// describe('getSpectreFromMatrix(visibleBoardData', () => {
//     let spectre
//     let visibleEmptyBoard = getVisibleBoard(examples.validEmptyBoard.data)
//     let visibleInProgressBoard = getVisibleBoard(examples.validBoardInProgress.data)
//     it (`if given matrix of 0s, returns a string of 'null' that is same length as matrix width.`, () => {
//         spectre = getSpectreFromMatrix(visibleEmptyBoard)
//         expect(spectre).to.have.lengthOf(visibleEmptyBoard[0].length)
//         assert(spectre.every(val => _.isNull(val)), 'not every val is null')
//     })
//     it(`if given matrix which contains no values > 0 in first col, will return array with null in first column only.`, () => {
//         spectre = getSpectreFromMatrix(visibleInProgressBoard)
//         assert(_.isNull(spectre[0]) && spectre.slice(1).every(val => !_.isNull(val)), 'not an array with only first value as null')
//     })
// })




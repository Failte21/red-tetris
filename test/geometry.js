import chai from "chai"
import _ from 'lodash'

import {TETROS} from "../src/common/game";
import {pieceToShape, rotate, shapeToPiece} from "../src/client/utils/geometry";

const assert = chai.assert
const expect = chai.expect
const should = chai.should()

describe('pieceToShape(piece)', () => {
    it(`takes an array of coordinates and maps them to a 4x4 matrix`, done => {
        for (let piece of TETROS.PIECES) {
            const shape = pieceToShape(piece)
            expect(shape).to.have.lengthOf(4)
            assert(shape.every(row => row.length === 4), `Not every row in ${piece} has length of 4`)
        }
        done()
    })
    it('each matrix is filled with 0s, except for four 1s', done => {
        for (let piece of TETROS.PIECES) {
            const shape = pieceToShape(piece)
            assert(_.flatten(shape).filter(val => val === 1).length === 4, 'there are more than four 1s in shape')
            assert(_.flatten(shape).filter(val => val === 0).length === 12, 'incorrect empty spaces in shape')
        }
        done()
    })
    it('correctly maps each coordinate from "piece" to a "1" on the matrix', done => {
        for (let piece of TETROS.PIECES) {
            const shape = pieceToShape(piece)
            assert(piece.every(pt => shape[pt[1], pt[0]]), `some coordinates are not mapped as 1s for ${piece}`)
        }
        done()
    })
})

describe('shapeToPiece(piece)', () => {
    it(`turns shape back into original piece if used with pieceToShape`, done => {
        for (let piece of TETROS.PIECES) {
            const shape = pieceToShape(piece)
            const returnedPiece = shapeToPiece(shape)
            expect(returnedPiece).to.have.all.deep.members(piece, `original ${piece} does not equal return: ${returnedPiece}`)
        }
        done()
    })
})

describe('rotate(shape)', () => {
    it(`returns a 4x4 of ints (shape) from a 4x4 of ints`, done => {
        for (let piece of TETROS.PIECES) {
            const shape = pieceToShape(piece)
            const rotatedShape90 = rotate(shape)
            const rotatedShape180 = rotate(rotatedShape90)
            const rotatedShape270 = rotate(rotatedShape180)

            expect(rotatedShape90 && rotatedShape180 && rotatedShape270).to.have.lengthOf(4)
            expect(rotatedShape90 && rotatedShape180 && rotatedShape270).to.have.lengthOf(4)
            assert(rotatedShape90.every(row => row.length === 4), 'not a 4x4 square')
            assert(rotatedShape90.every(row => row.every(pt => typeof pt === 'number')), 'not all ints')
        }
        done()
    })
    it(`shape is identical to start shape when rotated 4 times`, done => {
        for (let piece of TETROS.PIECES) {
            const shape = pieceToShape(piece)
            const rotatedShape360 = rotate(rotate(rotate(rotate(shape))))
            expect(rotatedShape360).to.have.all.deep.members(shape)
        }
        done()
    })
    it('never goes outside its bounds when rotated', done => {
        for (let piece of TETROS.PIECES) {
            const maxXorY = _.max(_.flatten(piece))
            const shape = pieceToShape(piece)

            const rotations = [
                rotate(shape),
                rotate(rotate(shape)),
                rotate(rotate(rotate(shape))),
                rotate(rotate(rotate(rotate(shape)))) ]


            rotations.forEach((rotation, i) => {
                const toPiece = shapeToPiece(rotation)
                assert(_.flatten(toPiece).every(val => val <= maxXorY), `when rotated ${90 * i}, [${piece}] has an X or Y > ${maxXorY}`)
            })
        }
        done()
    })
})




import _ from 'lodash'

// not sure if we will need, just for looking at them
export const drawPiece = (shape) => {
    let drawnPiece = _.fill(new Array(_.max(_.flatten(shape)) + 1), _.fill(new Array(_.max(_.flatten(shape)) + 1), 0))
        .map((row, y) => (
            row.map((col, x) => (
                shape.find((pt) => pt[0] === x && pt[1] === y) ? 1 : 0
            )))
        )
    console.log("shape", shape)
    drawnPiece.forEach((row) => console.log(row) + '\n')
}
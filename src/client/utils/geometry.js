import _ from 'lodash'

// turns matrix-shape into piece
export const shapeToPiece = (shape) => {
    let piece =  shape.map((row, y) => {
        return row.map((pt, x) => (shape[y][x] ? ([x, y]) : ''))
            .filter(pt => !!pt)
    })
    return _.flatten(piece)
}

// takes piece, e.g. [[0,1],[1,1],[2,1],[3,1]]
// turns into a square matrix ('shape')
export const pieceToShape = (piece) => {
    let shape = Array(4).fill(Array(4).fill(0))
        .map((row, y) => (
            row.map((col, x) => (
                piece.find((pt) => pt[0] === x && pt[1] === y) ? 1 : 0
            )))
        )
    return shape
}

// takes shape (square matrix) and rotates
export const rotate = (shape) =>  {
    const n = _.max(_.flatten(shapeToPiece(shape)))
    return shape.map((row, y) => (
        row.map((pt, x) =>  x <= n ? shape[n - x][y] : 0)
    ))
}

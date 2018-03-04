// turns matrix-shape into piece
export const shapeToPiece = (shape) => {
    let piece =  shape.map((row, y) => {
        row.map((pt, x) => shape[y][x] ? [x, y] : '')
            .filter(pt => !!pt)
    })
    return (piece)
}

// takes shape, e.g. [[0,1],[1,1],[2,1],[3,1]]
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
    const n = shape[0].length
    return shape.map((row, y) => (
        row.map((pt, x) => shape[n - 1 - x][y])
    ))
}

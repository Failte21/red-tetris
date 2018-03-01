import _ from 'lodash'

// assumes all boardData including hidden rows
export const applyMalusToBoard = (boardData) => boardData.slice(1)

// cuts off hidden first 2 rows of board (for doing mutations above)
export const getVisibleBoard = (boardData) => boardData.slice(2)

// Reduces 2D board to minimal data needed for spectre
// assumes input of visible board data only (no hidden)
export const getSpectreFromMatrix = (visibleBoardData) => (
    visibleBoardData.reduce((accRow, curRow, y) => (
            curRow.map((pt, x) =>
                (!accRow[x] && curRow[x] ? y : accRow[x])))
        , _.fill(new Array(visibleBoardData[0].length), null))
)

export const TETROS = {
    SHAPES:
        [	[[0,1],[1,1],[2,1],[3,1]],	// I
            [[0,0],[0,1],[1,1],[1,0]],	// O
            [[0,1],[1,1],[2,1],[2,0]],	// L
            [[0,1],[1,1],[2,1],[0,0]],	// J
            [[1,0],[2,0],[0,1],[1,1]],	// S
            [[0,0],[1,0],[1,1],[2,1]],	// Z
            [[1,0],[0,1],[1,1],[2,1]]	// T
        ],
    COLORS: [
        'red',
        'yellow',
        'magenta',
        'blue',
        'cyan',
        'green',
        'orange'
    ],

}

export const BOARD = {
    HEIGHT: 22, // including 2 hidden rows at the top
    WIDTH: 10,
    MIN_X: 0,
    MAX_X: 9,
    MIN_Y: 0,
    MAX_Y: 21,

    EMPTY_NEW_BOARD: _.fill(new Array(20), _.fill(new Array(10), 0))

}

export const GAME = {
    INTERVAL: 1000, // ms between piece lock timeout
}

import _ from 'lodash'

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
    HEIGHT: 24, // including hidden rows at the top
    WIDTH: 10,
    MIN_X: 0,
    MIN_VISIBLE_X: 4, // can prob get rid of
    MIN_Y: 0,
    MAX_X: 23,
    MAX_Y: 9,
}

export const GAME = {
    INTERVAL: 1000, // ms between piece lock timeout
}
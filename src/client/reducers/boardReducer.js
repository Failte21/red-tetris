import {
    JOIN_GAME, NEW_GAME, START_FAILURE, START_SUCCESS, LEAVE_GAME, DELETE_GAME,
    REMOVE_PLAYER, UPDATE_GAME, NOGAME_MESSAGE, ERROR, START_GAME_LOOP
} from '../actions/actionTypes'
import {BOARD} from "../../common/game";

const defaultState = {
    boardData: BOARD.EMPTY_NEW_BOARD
    pieceLineUp: []
}

const gameReducer = (state = defaultState, action) => {
    switch (action.type) {
        case START_GAME_LOOP:
            return {...state, pieceLineUp: action.payload.game.pieceLineUp }
        default:
            return state
    }
}

export default gameReducer
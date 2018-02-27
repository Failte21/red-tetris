import {BOARD} from "../../common/game";
import {START_GAME_LOOP} from "../actions/actionTypes";


const defaultState = {
    boardData: BOARD.EMPTY_NEW_BOARD
}

const boardReducer = (state = defaultState, action) => {
    switch (action.type) {
        case START_GAME_LOOP:
            return {...state}
        default:
            return state
    }
}

export default boardReducer
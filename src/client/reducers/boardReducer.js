import {BOARD} from "../../common/game";
import {START_GAME_LOOP, UPDATE_GAME} from "../actions/actionTypes";


const defaultState = {
    boardData: BOARD.EMPTY_NEW_BOARD
}

const boardReducer = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default boardReducer
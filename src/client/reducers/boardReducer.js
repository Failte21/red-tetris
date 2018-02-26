import {BOARD} from "../../common/game";


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
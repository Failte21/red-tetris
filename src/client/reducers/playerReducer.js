import {
    ERROR,
    JOIN_GAME, NEW_GAME, START_GAME_LOOP, SUBSCRIBE_PLAYER, UPDATE_GAME,
    UPDATE_PLAYER
} from '../actions/actionTypes'
import {BOARD} from "../../common/game";

export const emptyPlayer = {
	playerName: '',
	socketId: '',
	isPlaying: false,
    spectre: BOARD.EMPTY_NEW_BOARD
}

const playerReducer = (state = emptyPlayer, action) => {
	switch (action.type) {
        case UPDATE_PLAYER: // gets payload in middleware from UPDATE_GAME
            return {...state, ...action.payload}
        case ERROR:
            return action.payload.redirect === 'true' ? emptyPlayer : state
		default:
			return state
	}
}

export default playerReducer

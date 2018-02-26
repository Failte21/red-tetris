import {
    JOIN_GAME, NEW_GAME, START_FAILURE, START_SUCCESS, LEAVE_GAME, DELETE_GAME,
    REMOVE_PLAYER, DELETE_ALL, UPDATE_GAME, NOGAME_MESSAGE, ERROR
} from '../actions/actionTypes'

const defaultState = {
	roomName: '',
	leadPlayerName: '',
	playerNames: [],
	pieceLineUp: [],
	hasStarted: false,
	hasEnded: false,
	winnerName: null,
    spectres: []
}

const gameReducer = (state = defaultState, action) => {
	switch (action.type) {
		case JOIN_GAME:
			return action.payload.game
        case NEW_GAME: //same as join game
            return action.payload.game
        case REMOVE_PLAYER: //same as UPDATE_GAME
            return action.payload
        case UPDATE_GAME:
            return action.payload
        case ERROR:
            return action.payload.redirect ? defaultState : state
		default:
			return state
	}
}

export default gameReducer
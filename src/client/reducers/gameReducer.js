import {
    JOIN_GAME, NEW_GAME, START_FAILURE, START_SUCCESS, LEAVE_GAME, DELETE_GAME,
    REMOVE_PLAYER, DELETE_ALL, UPDATE_GAME, NOGAME_MESSAGE
} from '../actions/actionTypes'

const defaultState = {
	roomName: '',
	leadPlayerName: '',
	playerNames: [],
	pieceLineUp: [],
	hasStarted: false,
	hasEnded: false,
	gameError: '',
	winnerName: null
}

const gameReducer = (state = defaultState, action) => {
	switch (action.type) {
		case JOIN_GAME:
			return action.payload.game
        case REMOVE_PLAYER:
            return {...state, playerNames: state.playerNames.filter(playerName => playerName !== action.payload)}
        case UPDATE_GAME:
            return action.payload
		default:
			return state
	}
}

export default gameReducer

// case NEW_GAME:
// 	return {...state, ...action.payload.game}
// moved to MetaReducer because if there is a start error, there is no game
// case START_FAILURE:
//     return {...state, startError: action.payload }
// case START_SUCCESS:
// return {...state, startError: '' }
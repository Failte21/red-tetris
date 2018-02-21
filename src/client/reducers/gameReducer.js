import {
    JOIN_GAME, NEW_GAME, START_FAILURE, START_SUCCESS, LEAVE_GAME, DELETE_GAME,
    REMOVE_PLAYER
} from '../actions/actionTypes'

const defaultState = {
	boardName: '',
	leadPlayerName: '',
	playerNames: [],
	pieceLineUp: [],
	hasStarted: false,
	hasEnded: false,
	startError: '',
	winnerName: null
}

const gameReducer = (state = defaultState, action) => {
	switch (action.type) {
		case JOIN_GAME:
			return {...state, ...action.payload.game}
		case NEW_GAME:
			return {...state, ...action.payload.game}
		case START_FAILURE:
			return {...state, startError: action.payload }
		case START_SUCCESS:
			return {...state, startError: '' }
        case REMOVE_PLAYER:
            return {...state, playerNames: state.playerNames.filter(playerName => playerName !== action.payload)}
		default:
			return state
	}
}

export default gameReducer
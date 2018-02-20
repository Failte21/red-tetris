import { JOIN_GAME, NEW_GAME, START_FAILURE, START_SUCCESS } from '../actions/actionTypes'

const defaultState = {
	boardName: '',
	leadPlayerName: '',
	playerNames: '',
	pieceLineUp: [],
	hasStarted: false,
	hasEnded: false,
	startError: false,
	winnerName: null
}

const gameReducer = (state = defaultState, action) => {
    switch (action.type) {
	    case JOIN_GAME:
            return {...state, ...action.payload.game}
	    case NEW_GAME:
	    	return {...state, ...action.payload.game}
        case START_FAILURE:
            return {...state, startError: true }
        case START_SUCCESS:
            return {...state, startError: false }
        default:
            return state
    }
}

export default gameReducer
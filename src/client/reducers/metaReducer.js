import { NEW_GAME, START_FAILURE, START_SUCCESS } from '../actions/actionTypes'

const defaultState = {
	inProgressGames: [],
	readyGames: []
}

const metaReducer = (state = defaultState, action) => {
    switch (action.type) {
	    case NEW_GAME:
	    	return {...state, readyGames: [...state.readyGames, ...action.payload.game.boardName]}
        case START_FAILURE:
            return {...state, startError: true }
        case START_SUCCESS:
            return {...state, startError: false }
        default:
            return state
    }
}

export default metaReducer
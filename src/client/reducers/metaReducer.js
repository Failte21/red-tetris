import {
    ANNOUNCE_DELETE_IN_PROGRESS_GAME, ANNOUNCE_DELETE_READY_GAME, ANNOUNCE_NEW_GAME, DELETE_ALL
} from '../actions/actionTypes'

const defaultState = {
	inProgressGames: [],
	readyGames: []
}

const metaReducer = (state = defaultState, action) => {
    switch (action.type) {
	    case ANNOUNCE_NEW_GAME:
	    	return {...state, readyGames: [...state.readyGames, ...action.payload.roomName]}
        case ANNOUNCE_DELETE_IN_PROGRESS_GAME:
            return {...state, inProgressGames: state.inProgressGames.filter(g => g !== action.payload.roomName)}
        case ANNOUNCE_DELETE_READY_GAME:
            return {...state, readyGames: state.readyGames.filter(g => g !== action.payload.roomName)}
        case DELETE_ALL:
            return {...state, ...defaultState}
        default:
            return state
    }
}

export default metaReducer
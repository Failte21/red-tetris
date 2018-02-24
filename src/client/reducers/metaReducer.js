import {
    ANNOUNCE_DELETE_IN_PROGRESS_GAME, ANNOUNCE_DELETE_READY_GAME, ANNOUNCE_NEW_GAME, DELETE_ALL, JOIN_GAME, NEW_GAME,
    NOGAME_MESSAGE,
    START_FAILURE, START_SUCCESS
} from '../actions/actionTypes'

const defaultState = {
    userMessage: '',
    startError: false,
    startSuccess: false
}

const metaReducer = (state = defaultState, action) => {
    switch (action.type) {
        case NOGAME_MESSAGE:
            return {...state, userMessage: action.payload }
        case START_FAILURE:
            return {...state, startError: true }
        case JOIN_GAME:
            return {...state, startError: false, userMessage: '' }
        // case ANNOUNCE_NEW_GAME:
	    	// return {...state, readyGames: [...state.readyGames, ...action.payload.roomName]}
        // case ANNOUNCE_DELETE_IN_PROGRESS_GAME:
        //     return {...state, inProgressGames: state.inProgressGames.filter(g => g !== action.payload.roomName)}
        // case ANNOUNCE_DELETE_READY_GAME:
        //     return {...state, readyGames: state.readyGames.filter(g => g !== action.payload.roomName)}
        default:
            return state
    }
}

export default metaReducer
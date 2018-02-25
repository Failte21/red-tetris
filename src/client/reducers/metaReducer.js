import {
    ANNOUNCE_DELETE_IN_PROGRESS_GAME, ANNOUNCE_DELETE_READY_GAME, ANNOUNCE_NEW_GAME, DELETE_ALL, ERROR_MESSAGE,
    JOIN_GAME, NEW_GAME,
    NOGAME_MESSAGE,
    START_FAILURE, START_SUCCESS, USER_MESSAGE
} from '../actions/actionTypes'

const defaultState = {
    userMessage: '',
    errorMessage: '',
    startError: false,
    startSuccess: false,
}

const metaReducer = (state = defaultState, action) => {
    switch (action.type) {
        case NOGAME_MESSAGE:
            return {...state, userMessage: action.payload }
        case START_FAILURE:
            return {...state, startError: true, errorMessage: action.payload.errorMessage }
        case JOIN_GAME:
            return {...state, startError: false, errorMessage: '', userMessage: '' }
        case USER_MESSAGE:
            return {...state, userMessage: action.payload}
        case ERROR_MESSAGE:
            return {...state, errorMessage: action.payload}
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
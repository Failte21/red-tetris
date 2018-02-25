import {
    ANNOUNCE_DELETE_IN_PROGRESS_GAME, ANNOUNCE_DELETE_READY_GAME, ANNOUNCE_NEW_GAME, DELETE_ALL, ERROR_MESSAGE,
    JOIN_GAME, JOIN_GAME_FAILURE, JOIN_GAME_SUCCESS, NEW_GAME,
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
        case START_FAILURE:
            return {...state, startError: true, errorMessage: action.payload.errorMessage }
        case JOIN_GAME:
            return {...state, startError: false, userMessage: '' }
        // case JOIN_GAME_FAILURE:
        //     return {...state, startError: true, errorMesssage: action.payload.errorMessage }
        // case JOIN_GAME_SUCCESS:
        //     return {...state, startError: false, errorMessage: '', userMessage: 'You have joined a game!' }
        case USER_MESSAGE:
            return {...state, userMessage: action.payload}
        case ERROR_MESSAGE:
            return {...state, errorMessage: action.payload}
        default:
            return state
    }
}

export default metaReducer
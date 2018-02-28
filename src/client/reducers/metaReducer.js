import {
    ANNOUNCE_DELETE_IN_PROGRESS_GAME, ANNOUNCE_DELETE_READY_GAME, ANNOUNCE_NEW_GAME, DELETE_ALL, ERROR_MESSAGE,
    JOIN_GAME, ERROR, JOIN_GAME_FAILURE, JOIN_GAME_SUCCESS, NEW_GAME,
    NOGAME_MESSAGE,
    START_FAILURE, START_SUCCESS, USER_MESSAGE, UPDATE_GAME
} from '../actions/actionTypes'
import {JOIN_ROOM_MSG, NEW_GAME_MSG} from "../../common/messages";

const defaultState = {
    userMessage: '',
    startError: false,
    startSuccess: false,
}

const metaReducer = (state = defaultState, action) => {
    switch (action.type) {
        case START_FAILURE:
            return {...state, startError: true, userMessage: action.payload.errorMessage }
        case UPDATE_GAME:
            return {...state, startError: false, userMessage: '' }
        // case NEW_GAME: //same as join game
        //     return {...state, startError: false, errorMessage: '' }
        case USER_MESSAGE:
            return {...state, userMessage: action.payload}
        // case ERROR_MESSAGE:
        //     return {...state, errorMessage: action.payload}
        case ERROR:
            return {...state, userMessage: action.payload.errorMessage, startError: !!action.payload.redirect }
        default:
            return state
    }
}

export default metaReducer
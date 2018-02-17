import {ADD_PLAYER, START_FAILURE, START_SUCCESS} from '../actions/actionTypes'

const emptyPlayer = {
    name: ''
}

const defaultState = {
    players: [],
    boardName: '',
    started: false,
    fail: false
}

const gameReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PLAYER:
            return {...state, players: [...state.players, { ...emptyPlayer, name: action.payload }]}
        case START_FAILURE:
            return {...state, fail: true}
        case START_SUCCESS:
            return {...state, started: true, boardName: action.payload}
        default:
            return state
    }
}

export default gameReducer
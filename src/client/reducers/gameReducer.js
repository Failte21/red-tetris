import {
    JOIN_GAME, NEW_GAME, START_FAILURE, START_SUCCESS, LEAVE_GAME, DELETE_GAME,
    REMOVE_PLAYER, DELETE_ALL, UPDATE_GAME, NOGAME_MESSAGE, ERROR, UPDATE_SPECTRE, START_GAME_LOOP
} from '../actions/actionTypes'

const defaultState = {
    roomName: '',
    leadPlayerName: '',
    playerNames: [],
    players: [],
    pieceLineUp: [],
    isInProgress: false,
    winnerName: '',
    isSinglePlayer: true
}

const gameReducer = (state = defaultState, action) => {
	switch (action.type) {
		case JOIN_GAME:
			return action.payload.game
        case NEW_GAME: //same as join game
            return action.payload.game
        case REMOVE_PLAYER: //same as UPDATE_GAME
            return action.payload
        case UPDATE_GAME:
            return action.payload
        case START_GAME_LOOP: // same as UPDATE_GAME
            return action.payload.game
        case ERROR:
            return action.payload.redirect ? defaultState : state
		default:
			return state
	}
}

export default gameReducer
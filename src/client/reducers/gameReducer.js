import {
    JOIN_GAME, NEW_GAME, START_FAILURE, START_SUCCESS, LEAVE_GAME, DELETE_GAME,
    REMOVE_PLAYER, DELETE_ALL, UPDATE_GAME, NOGAME_MESSAGE, ERROR, UPDATE_SPECTRE, START_GAME_LOOP
} from '../actions/actionTypes'
import _ from 'lodash'

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
		// case JOIN_GAME:
		// 	return action.payload.game
        case UPDATE_GAME:
            console.log("action.payload", action.payload)
            return _.cloneDeep(action.payload)
        case ERROR:
            return action.payload.redirect === 'true' ? defaultState : state
		default:
			return state
	}
}

export default gameReducer

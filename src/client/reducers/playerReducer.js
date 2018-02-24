import {DELETE_ALL, JOIN_GAME, SUBSCRIBE_PLAYER} from '../actions/actionTypes'

const emptyPlayer = {
	playerName: '',
	playerId: '',
	socketId: '',
	currentRoomName: '',
	isPlaying: false
}

const playerReducer = (state = emptyPlayer, action) => {
	switch (action.type) {
        case SUBSCRIBE_PLAYER:
			return {...state, ...action.payload }
		case DELETE_ALL:
            return {...state, ...emptyPlayer}
        case JOIN_GAME:
            return action.payload.player
		default:
			return state
	}
}

export default playerReducer
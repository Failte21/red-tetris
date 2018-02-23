import {DELETE_ALL, SUBSCRIBE_PLAYER} from '../actions/actionTypes'

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
		default:
			return state
	}
}

export default playerReducer
import { SUBSCRIBE_PLAYER } from '../actions/actionTypes'

const emptyPlayer = {
	playerName: '',
	playerId: '',
	socketId: '',
	currentBoardName: '',
	isPlaying: false
}

const playerReducer = (state = emptyPlayer, action) => {
	switch (action.type) {
            case SUBSCRIBE_PLAYER:
			return {...state, ...action.payload }
		default:
			return state
	}
}

export default playerReducer
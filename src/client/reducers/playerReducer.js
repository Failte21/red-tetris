import {JOIN_GAME, NEW_GAME} from '../actions/actionTypes'

const emptyPlayer = {
	playerName: '',
	playerId: '',
	socketId: '',
	currentBoardName: '',
	isPlaying: null
}

const playerReducer = (state = emptyPlayer, action) => {
	switch (action.type) {
		case JOIN_GAME:
			return {...state, ...action.payload.player }
		case NEW_GAME:
			return {...state, ...action.payload.player }
		default:
			return state
	}
}

export default playerReducer
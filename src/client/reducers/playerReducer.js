import {JOIN_GAME, NEW_GAME, SUBSCRIBE_PLAYER, UPDATE_GAME} from '../actions/actionTypes'

const emptyPlayer = {
	playerName: '',
	socketId: '',
	currentRoomName: '',
	isPlaying: false
}

const playerReducer = (state = emptyPlayer, action) => {
	switch (action.type) {
        case JOIN_GAME:
            return action.payload.player
        case NEW_GAME: //same as join game
            return action.payload.player
        case UPDATE_GAME:
            return {...state, currentRoomname: action.payload.roomName}
		default:
			return state
	}
}

export default playerReducer
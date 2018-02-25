import {JOIN_GAME, SUBSCRIBE_PLAYER, UPDATE_GAME} from '../actions/actionTypes'

const emptyPlayer = {
	playerName: '',
	socketId: '',
	currentRoomName: '',
	isPlaying: false
}

const playerReducer = (state = emptyPlayer, action) => {
	switch (action.type) {
        case JOIN_GAME_SUCCESS:
            return action.payload.player
        case UPDATE_GAME:
            return {...state, currentRoomname: action.payload.game.roomName}
		default:
			return state
	}
}

export default playerReducer
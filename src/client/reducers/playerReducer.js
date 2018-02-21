import _ from 'lodash'
import {JOIN_GAME, NEW_GAME, LEAVE_GAME, DELETE_GAME } from '../actions/actionTypes'

const emptyPlayer = {
	playerName: '',
	playerId: '',
	socketId: '',
	currentBoardName: '',
	isPlaying: false
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
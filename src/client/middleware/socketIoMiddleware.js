import {SUBSCRIBE_PLAYER} from "../actions/actionTypes"
import {parseOptions} from "../actions/gameActions"

const socketIoMiddleWare = socket => ({dispatch, getState }) => {
	if(socket) {
		socket.on('action', dispatch)
    }
    const state = getState()
	console.log(state.player)
	if (!state.player || !state.player.currentRoomName)
        // parseOptions(match.params.boardOptions)
	// if (state && !state.player)
	return next => action => {
		if(socket && action.type && action.type === SUBSCRIBE_PLAYER )
			socket.emit('subscribe', {room: action.payload.currentRoomName })
		if(socket && action.type && action.type.indexOf('SERVER_') === 0)
			// send this action to the server
			socket.emit(action.type, action.payload)
		return next(action)
	}
}

export default socketIoMiddleWare
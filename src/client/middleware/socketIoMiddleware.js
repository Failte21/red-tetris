import {ERROR, SUBSCRIBE_PLAYER} from "../actions/actionTypes"
import {goBackWithError, parseRoute} from "../actions/gameActions"

const socketIoMiddleWare = socket => ({dispatch, getState}) => {
	if(socket) {
		socket.on('action', dispatch)
    }
	return next => action => {
		if (socket && action.type === '@@router/LOCATION_CHANGE') {
		    // TODO: Find out why location in store not keeping up
		    dispatch(parseRoute(action.payload))
		}
		if (socket && action.type === ERROR && action.payload.redirect) {
		    console.log("action.payload", action.payload)
            return dispatch(goBackWithError(action.payload))
        }
		if(socket && action.type && action.type === SUBSCRIBE_PLAYER )
			socket.emit('subscribe', {room: action.payload.currentRoomName })
		if(socket && action.type && action.type.indexOf('SERVER_') === 0)
			// send this action to the server
			socket.emit(action.type, action.payload)
		return next(action)
	}
}

export default socketIoMiddleWare
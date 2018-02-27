import {ERROR, SUBSCRIBE_PLAYER} from "../actions/actionTypes"
import {parseRoute} from "../actions/gameActions"

const socketIoMiddleWare = socket => ({dispatch, getState}) => {
	if(socket) {
		socket.on('action', dispatch)
    }
	return next => action => {
        if (socket && action.type === '@@router/LOCATION_CHANGE')
            dispatch(parseRoute(action.payload))
        if (socket && action.type && action.type.indexOf('SERVER_') === 0) {
            console.log("action.type", action.type)
            socket.emit(action.type, action.payload)
        }
		return next(action)
	}
}

export default socketIoMiddleWare
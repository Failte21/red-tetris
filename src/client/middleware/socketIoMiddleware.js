import {ERROR, SUBSCRIBE_PLAYER, UPDATE_GAME, UPDATE_PLAYER} from "../actions/actionTypes"
import {parseRoute} from "../actions/gameActions"

const socketIoMiddleWare = socket => ({dispatch, getState}) => {
    const state = getState()
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
        if (socket && action.type === UPDATE_GAME) {
            console.log("action.payload.players.filter(p => p.socketId === socket.id)}", action.payload.players.find(p => p.socketId === socket.id))
            dispatch({type: UPDATE_PLAYER, payload: action.payload.players.find(p => p.socketId === socket.id)})
        }
		return next(action)
	}
}

export default socketIoMiddleWare
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
            socket.emit(action.type, action.payload)
        }
        if (socket && action.type === UPDATE_GAME) {
            //console.log("player sent from UPDATE_GAME for UPDATE_PLAYER: ", action.payload.players.find(p => p.socketId === socket.id))
            dispatch({type: UPDATE_PLAYER, payload: action.payload.players.find(p => p.socketId === socket.id)})
        }
		return next(action)
	}
}

export default socketIoMiddleWare

import {checkValidHashURL} from "../../common/inputValidation"
import {SERVER_ADD_PLAYER, START_FAILURE, SUBSCRIBE_PLAYER} from "../actions/actionTypes"
import {parseOptions} from "../actions/gameActions"
import { push } from 'react-router-redux'

const socketIoMiddleWare = socket => ({dispatch, getState}) => {
	if(socket) {
		socket.on('action', dispatch)
    }
	return next => action => {
		if (socket && action.type && action.type === '@@router/LOCATION_CHANGE') {
			console.log('location CHANGED, hash: ', action.payload.hash.substring(1))
			console.log(action.payload)
			const options = checkValidHashURL(action.payload.hash.substring(1))
			if (options.error) return dispatch({type: START_FAILURE, payload: options.error})
			else return dispatch({type: SERVER_ADD_PLAYER, payload: {playerName: options.playerName, roomName: options.roomName}})
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
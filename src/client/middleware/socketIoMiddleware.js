import {checkValidHashURL} from "../../common/inputValidation"
import {DELETE_ALL, SERVER_ADD_PLAYER, START_FAILURE, SUBSCRIBE_PLAYER} from "../actions/actionTypes"
import {parseOptions} from "../actions/gameActions"
import { push } from 'react-router-redux'

const socketIoMiddleWare = socket => ({dispatch, getState}) => {
	if(socket) {
		socket.on('action', dispatch)
    }
	return next => action => {
		if (action.type === DELETE_ALL) {
			return dispatch(push('/'))
		}
		if (socket && action.type === '@@router/LOCATION_CHANGE') {
			console.log(action.payload)
			const hash = action.payload.hash ? action.payload.hash.substring(1) : ''
            const options = checkValidHashURL(hash)
                if (options.error) {
                    if (action.payload.hash || action.payload.pathname.length > 1) dispatch(push('/'))
                    return dispatch({type: START_FAILURE, payload: options.error})
                }
                else return dispatch({
                    type: SERVER_ADD_PLAYER,
                    payload: {playerName: options.playerName, roomName: options.roomName}
                })
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
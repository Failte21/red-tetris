const socketIoMiddleWare = socket => ({dispatch, getState}) => {
	if(socket) socket.on('action', action => {
		dispatch(action)
	})
	return next => action => {
		if(socket && action.type && action.type.indexOf('SERVER_') === 0)
			// send this action to the server
			socket.emit('action', action)
		return next(action)
	}
}

export default socketIoMiddleWare
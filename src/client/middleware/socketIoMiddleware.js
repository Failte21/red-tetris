const socketIoMiddleWare = socket => ({dispatch}) => {
	if(socket) socket.on('action', dispatch)
	return next => action => {
		if(socket && action.type && action.type.indexOf('SERVER_') === 0)
			// send this action to the server
			socket.emit('action', action)
		return next(action)
	}
}

export default socketIoMiddleWare
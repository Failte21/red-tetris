const socketIoMiddleWare = socket => ({dispatch, getState}) => {
	if(socket) socket.on('action', dispatch)
	return next => action => {
		if(socket && action.type && action.type.indexOf('SERVER_') === 0)
			socket.emit('action', action)
		return next(action)
	}
}

export default socketIoMiddleWare
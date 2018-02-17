const storeStateMiddleWare = ({ getState }) => next => action => {
    window.top.state = getState()
    next(action)
}

export default storeStateMiddleWare

import alert from './alert'
import { combineReducers } from 'redux'
import gameReducer from './gameReducer'
import metaReducer from './metaReducer'
import playerReducer from './playerReducer'

export default combineReducers({
    alert: alert,
    meta: metaReducer,
    game: gameReducer,
    player: playerReducer
})



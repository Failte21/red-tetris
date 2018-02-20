import alert from './alert'
import { combineReducers } from 'redux'
import gameReducer from './gameReducer'
import playerReducer from './playerReducer'

export default combineReducers({
    alert: alert,
    game: gameReducer,
    player: playerReducer
})



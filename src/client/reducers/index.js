import alert from './alert'
import { combineReducers } from 'redux'
import gameReducer from './gameReducer'

export default combineReducers({
    alert: alert,
    game: gameReducer
})




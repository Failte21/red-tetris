import alert from './alert'
import { combineReducers } from 'redux'
import gameReducer from './gameReducer'
import metaReducer from './metaReducer'
import playerReducer from './playerReducer'
import routerReducer from "./routerReducer"
import boardReducer from "./boardReducer";

export default combineReducers({
    alert: alert,
    meta: metaReducer,
    game: gameReducer,
    player: playerReducer,
    board: boardReducer,
    router: routerReducer
})



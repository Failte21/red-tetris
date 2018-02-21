import {splitOptions} from "../../common/inputValidation"
import {SERVER_ADD_PLAYER, START_FAILURE} from './actionTypes'


export const parseOptions = options => dispatch => {
    const check = splitOptions(options)
    const { error, playerName, boardName } = check
    if (error) return dispatch({type: START_FAILURE, payload: error })
    return dispatch ({type: SERVER_ADD_PLAYER, payload: {playerName, boardName}})
}
import {checkValidHashURL} from "../../common/inputValidation"
import {START_FAILURE} from './actionTypes'
import {onPlayerEnterRoom} from "./server"

export const parseOptions = options => dispatch => {
    console.log('called parseOptions with ', options)
    const checkValidParams = checkValidHashURL(options)
    const { error, playerName, roomName } = checkValidParams
    if (error) return dispatch({type: START_FAILURE, payload: error })
    return dispatch(onPlayerEnterRoom(playerName, roomName))
}
import {checkValidHashURL} from "../../common/inputValidation"
import {ERROR, USER_MESSAGE} from './actionTypes'
import {onPlayerEnterRoom} from "./server"
import {WELCOME_MSG} from "../../common/messages";

export const showUserMessage = (message) => {
    return ({
        type: USER_MESSAGE,
        payload: message
    })
}

export const parseRoute = (location) => dispatch => {
    const noHash = !location.hash || location.hash.length === 1

    if (noHash) return dispatch(showUserMessage(WELCOME_MSG))

    const formattedHash = location.hash.slice(1)
    const hashCheck = checkValidHashURL(formattedHash)
    if (hashCheck.error) dispatch({type: ERROR, payload: {errorMessage: hashCheck.error, redirect: 'true'}})
    else dispatch(onPlayerEnterRoom(hashCheck.playerName, hashCheck.roomName))
}

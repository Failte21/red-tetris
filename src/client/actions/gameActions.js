import {checkValidHashURL} from "../../common/inputValidation"
import {ERROR_MESSAGE, NOGAME_MESSAGE, START_FAILURE, USER_MESSAGE} from './actionTypes'
import {onPlayerEnterRoom} from "./server"
import { goBack, push } from 'react-router-redux'
import {welcome} from "../../common/messages";

export const showErrorMessage = (message) => {
    return ({
        type: ERROR_MESSAGE,
        payload: message
    })
}

export const showUserMessage = (message) => {
    return ({
        type: USER_MESSAGE,
        payload: message
    })
}

export const startFailure = (errorMessage) => dispatch => {
    dispatch(goBack())
    return dispatch({type: START_FAILURE, payload: errorMessage})
}

export const goBackWithError = (error) => dispatch => {
    dispatch(goBack())
    return dispatch(showErrorMessage(error))
}

export const parseRoute = location => dispatch => {
    const noHash = !location.hash || location.hash.length === 1

    if (noHash) return dispatch(showUserMessage(welcome))

    const formattedHash = location.hash.slice(1)
    const hashCheck = checkValidHashURL(formattedHash)
    if (hashCheck.error) dispatch(startFailure(hashCheck.error))
    else dispatch(onPlayerEnterRoom(hashCheck.playerName, hashCheck.roomName))
}
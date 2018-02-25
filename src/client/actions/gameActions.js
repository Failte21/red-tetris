import {checkValidHashURL} from "../../common/inputValidation"
import {NOGAME_MESSAGE, START_FAILURE} from './actionTypes'
import {onPlayerEnterRoom} from "./server"
import { goBack, push } from 'react-router-redux'


export const messageNotInGame = (message) => {
    return ({
        type: NOGAME_MESSAGE,
        payload: message
    })
}

export const startError = () => {
    return ({
        type: START_FAILURE
    })
}

export const startFailure = (errorMessage) => dispatch => {
    dispatch(push('/'))
    dispatch(startError(errorMessage))
    dispatch(messageNotInGame(errorMessage))
    return
}

export const goBackWithError = (error) => dispatch => {
    dispatch(goBack())
    dispatch(messageNotInGame(error.error))
    return
}

export const parseRoute = location => dispatch => {
    const noHash = !location.hash || location.hash.length === 1

    if (noHash) return dispatch(messageNotInGame('WELCOME TO RT / PLEASE ENTER ROOMNAME AND USERNAME INTO URL BAR'))

    const formattedHash = location.hash.slice(1)
    const hashCheck = checkValidHashURL(formattedHash)
    if (hashCheck.error) dispatch(startFailure(hashCheck.error))
    else dispatch(onPlayerEnterRoom(hashCheck.playerName, hashCheck.roomName))
}
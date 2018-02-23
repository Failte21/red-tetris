import {INVALID_PLAYER_NAME, INVALID_ROOM_NAME, INVALID_URL_PARAMS} from "./errors"

const isValidName = (string) => {
    return string.match(/^\w{2,8}$/)
}

export const checkValidHashURL = (options) => {
    if (!options) return ({error: INVALID_URL_PARAMS, playerName: null, roomName: null})
    const splitOptions = options.split(/\[|]/)
    const [roomName, playerName] = splitOptions
    if (!roomName || !isValidName(roomName)) return ({error: INVALID_ROOM_NAME, playerName: null, roomName: null})
    if (!playerName || !isValidName(playerName)) return ({error: INVALID_PLAYER_NAME, playerName: null, roomName: null})
    return ({error: null, playerName, roomName})
}
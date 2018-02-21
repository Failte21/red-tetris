import {INVALID_PLAYER_NAME, INVALID_ROOM_NAME, INVALID_URL_PARAMS} from "./errors"

const isValidName = (string) => {
    return string.match(/^\w{2,8}$/)
}

export const splitOptions = (options) => {
    if (!options) return ({error: INVALID_URL_PARAMS, playerName: null, boardName: null})
    const splitOptions = options.split(/\[|]/)
    const [boardName, playerName] = splitOptions
    if (!boardName || !isValidName(boardName)) return ({error: INVALID_ROOM_NAME, playerName: null, boardName: null})
    if (!playerName || !isValidName(playerName)) return ({error: INVALID_PLAYER_NAME, playerName: null, boardName: null})
    return ({error: null, playerName, boardName})
}
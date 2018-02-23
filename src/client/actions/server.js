import {SERVER_ADD_PLAYER, SERVER_NUCLEAR_OPTION, SERVER_PING} from './actionTypes'

export const ping = () => {
  return {
    type: SERVER_PING
  }
}

export const onPlayerEnterRoom = (playerName, roomName) => {
  return {
    type: SERVER_ADD_PLAYER,
    payload: { roomName, playerName }
  }
}

export const nuclearOption = () => {
  return {
    type: SERVER_NUCLEAR_OPTION
  }
}
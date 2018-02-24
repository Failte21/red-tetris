import {SERVER_ADD_PLAYER, SERVER_PING} from './actionTypes'

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
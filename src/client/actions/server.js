import {SERVER_ADD_PLAYER, SERVER_PING, SERVER_START_GAME_LOOP} from './actionTypes'

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

export const startGameLoop = (roomName) => {
  return {
    type: SERVER_START_GAME_LOOP,
    payload: { roomName }
  }
}
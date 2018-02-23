import {ALERT_POP} from './actionTypes'

export const alert = message => {
  return {
    type: ALERT_POP,
    payload: message
  }
}
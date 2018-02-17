import {ALERT_POP} from '../actions/actionTypes'

const reducer = (state = {} , action) => {
  switch(action.type){
    case ALERT_POP:
      return { message: action.payload }
    default: 
      return state
  }
}

export default reducer


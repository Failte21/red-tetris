import {ERROR, ERROR_MESSAGE} from '../actions/actionTypes'
import { push } from 'react-router-redux'

const errorHandlerMiddleware = ({dispatch}) => next => action => {
    if (action.type === ERROR && action.payload.redirect === 'true' ) dispatch(push('/'))
    next(action)
}

export default errorHandlerMiddleware

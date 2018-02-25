import {ERROR} from '../actions/actionTypes'
import { push } from 'react-router-redux'

const errorHandlerMiddleware = ({dispatch}) => next => action => {
    if (action.type === ERROR) dispatch(push('/'))
    next(action)
}

export default errorHandlerMiddleware
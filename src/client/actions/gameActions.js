import {ADD_PLAYER, START_FAILURE, START_SUCCESS} from './actionTypes'

export const parseOptions = options => dispatch => {
    if (!options) {
        return dispatch({type: START_FAILURE})
    }

    //exemple d'options : 42born2code[lsimon]
    const splittedOptions = options.split(/\[|]/);
    const [boardName, playerName] = splittedOptions
    dispatch({type: ADD_PLAYER, payload: playerName})
    dispatch({type: START_SUCCESS, payload: boardName})
}
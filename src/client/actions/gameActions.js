import {ADD_PLAYER, START_FAILURE, START_SUCCESS, SERVER_ADD_PLAYER} from './actionTypes'

export const parseOptions = options => dispatch => {
    if (!options) {
        return dispatch({type: START_FAILURE, payload: 'You must provide a game and player name.'})
    }
    //exemple d'options : 42born2code[lsimon]
    const splittedOptions = options.split(/\[|]/);
    const [boardName, playerName] = splittedOptions
    if (boardName.length && playerName.length)
        return dispatch({type: SERVER_ADD_PLAYER, payload: {playerName, boardName }})
    else {
        return dispatch({type: START_FAILURE, payload: 'You must provide a game and player name.'})
    }
    // dispatch({type: START_SUCCESS, payload: boardName})
}
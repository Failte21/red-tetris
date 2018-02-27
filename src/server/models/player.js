import _ from 'lodash'
import {BOARD} from "../../common/game";


export class Player {
    constructor(playerName = null, socketId = null) {
        this.playerName = playerName
        this.socketId = socketId
        this.isPlaying = false
        this.spectre = BOARD.EMPTY_NEW_BOARD // i.e. board visible to others
    }
}

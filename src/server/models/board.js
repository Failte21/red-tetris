import {BOARD, TETROS} from "../../common/game";
import {Piece} from "./piece";

// to avoid naming conflict with component
// TODO: Maybe make extend Player
export class BoardModel {
    constructor(playerName, socketId) {
        this.playerName = playerName
        this.socketId = socketId
        this.boardData = _.fill(new Array(BOARD.HEIGHT), _.fill(new Array(BOARD.WIDTH), 0))
    }

    getVisibleBoard = () => {
        return this.boardData.slice(4)
    }
}
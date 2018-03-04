import _ from 'lodash'
import {TETROS} from "../../common/game";

export class Piece {
    constructor(index) {
        this.index = index
        this.shape = TETROS.PIECES[index]
    }
}

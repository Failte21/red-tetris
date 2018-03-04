import _ from 'lodash'
import {TETROS} from "../../common/game";
import {Piece} from "../models/piece";

export const generatePieceList = (len) => {
    return _.times(len, _.random.bind(0, TETROS.PIECES.length))
}

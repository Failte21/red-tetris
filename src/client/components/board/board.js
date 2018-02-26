import React from 'react'
import './board.scss'
import {BOARD} from "../../../common/game";

const style = {
    large: {width: '300px', height: '600px'},
    small: {width: '90px', height: '180px'}
}

const Board = ({size = 'large', hasStarted }) => (
    <div className={'board'} style={style[size]}>
        {!hasStarted &&
            BOARD.EMPTY_VISIBLE_BOARD.map((row, i) => (
                <div key={i} className={'row'}>
                    {row.map((cell, i) => (
                        <div key={i} className={'cell'}></div>
                    ))}
                </div>
            ))
        }
    </div>
)

export default Board
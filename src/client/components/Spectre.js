import React from 'react'
import './board/board.scss'

const Spectre = ({ hasStarted, playerName, spectreData }) => (
    <div className={'board small'}>
        {playerName}
        {spectreData.map((row, i) => (
                <div key={i} className={'row'}>
                    {row.map((cell, i) => (
                        <div key={i} className={'cell'} />
                    ))}
                </div>
            ))
        }
    </div>
)

export default Spectre
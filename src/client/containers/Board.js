import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '../components/board/board.scss'

const Board = ({ hasStarted, playerName, boardData }) => (
    <div className={'board large'}>
        {playerName}
        {boardData.map((row, i) => (
            <div key={i} className={'row'}>
                {row.map((cell, i) => (
                    <div key={i} className={'cell'} />
                ))}
            </div>
        ))
        }
    </div>
)

const mapStateToProps = (state) => {
    return {
        boardData: state.board.boardData
    }
}

// const mapDispatchToProps = dispatch => {
//TODO: Key events (moving piece)
//TODO: Making a line (client & server)
//     //return bindActionCreators({sendSpectreUpdate}, dispatch) //put in middleware?
//
// }

export default connect(mapStateToProps)(Board)
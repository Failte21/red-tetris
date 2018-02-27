import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '../components/board/board.scss'
import Spectre from "../components/Spectre";

const Board = ({ hasStarted, playerName, boardData, pieceLineUp, isPlaying }) => (
    <div className={'playerBoard'}>
        <Spectre
            size={'large'}
            hasStarted={hasStarted}
            playerName={playerName}
            spectreData={boardData}
            isPlaying={isPlaying} />
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
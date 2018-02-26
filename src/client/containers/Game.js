import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Board from '../components/board/board'
import BoardMeta from '../components/boardMeta/boardMeta'
import './app.scss'
import {startGameLoop} from "../actions/server";

const GameRoom = ({
                      roomName,
                      playerName,
                      playerNames,
                      isPlaying,
                      leadPlayerName,
                      hasStarted,
                      boardData,
                      spectres
                  }) => {

    return (
        <div className={'tetris'}>
            <div className={'main'}>
                <Board size={'large'} hasStarted={hasStarted} />

                {leadPlayerName === playerName &&
                    <button onClick={startGameLoop}>START GAME</button>}

                <BoardMeta
                    roomName={roomName}
                    playerName={playerName}
                    isPlaying={isPlaying}
                    hasStarted={hasStarted}
                    leadPlayerName={leadPlayerName}
                />
            </div>
            <div className={'opponents'}>
                {playerNames.filter(p=>p !== playerName).map((o, i) => (
                    <div key={i}>
                        <Board size={'small'} hasStarted={hasStarted} />
                        {o}
                    </div>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        playerNames: state.game.playerNames,
        spectres: state.game.spectres, //?
        isPlaying: state.player.isPlaying,
        hasStarted: state.game.hasStarted,
        leadPlayerName: state.game.leadPlayerName,
        boardData: state.board.boardData,
        pieceLineUp: state.game.pieceLineUp
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({startGameLoop}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)



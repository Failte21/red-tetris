import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Board from '../components/board/board'
import BoardMeta from '../components/boardMeta/boardMeta'
import GameMeta from '../components/gameMeta/gameMeta'
import './app.scss'
import { parseOptions } from '../actions/gameActions'

const GameRoom = ({
                      roomName,
                      playerName,
                      playerNames,
                      isPlaying,
                      leadPlayerName,
                      hasStarted }) => {

    return (
        <div className={'tetris'}>
            <div className={'main'}>
                <Board size={'large'}/>
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
                        <Board size={'small'}/>
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
        isPlaying: state.player.isPlaying,
        hasStarted: state.game.hasStarted,
        leadPlayerName: state.game.leadPlayerName
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)



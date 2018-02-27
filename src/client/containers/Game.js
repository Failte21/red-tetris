import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Spectre from '../components/Spectre'
import BoardMeta from '../components/boardMeta/boardMeta'
import './app.scss'
import {startGameLoop} from "../actions/server";
import Board from "./Board";

const GameRoom = ({
                      roomName,
                      playerName,
                      playerNames,
                      isPlaying,
                      leadPlayerName,
                      hasStarted,
                      spectres,
                      pieceLineUp,
                  }) => {
    const mySpectre = spectres.find(s => s.playerName === playerName)

    return (
        <div className={'tetris'}>
            <div className={'main'}>
                <Board
                    hasStarted={hasStarted}
                    playerName={playerName}
                    boardData={mySpectre.spectreData}
                    pieceLineUp={pieceLineUp}
                    isPlayer={isPlaying} />

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
                {spectres.filter(s=>s.playerName !== playerName).map((spectre, i) => (
                    <div key={i}>
                        <Spectre
                            size={'small'}
                            hasStarted={hasStarted}
                            playerName={spectre.playerName}
                            spectreData={spectre.spectreData}
                            isPlaying={spectre.isPlaying} />
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
        pieceLineUp: state.game.pieceLineUp,
        spectres: state.game.players.map(p=>({playerName: p.playerName, spectreData: p.spectre, isPlaying: p.isPlaying}))
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({startGameLoop}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)



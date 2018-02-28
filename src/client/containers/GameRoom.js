import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Spectre from '../components/Spectre'
import BoardMeta from '../components/BoardMeta'
import "../styles/app.scss"
import {startGameLoop} from "../actions/server";
import Board from "./Board";

const GameRoom = ({
                      roomName,
                      playerName,
                      playerNames,
                      isPlaying,
                      leadPlayerName,
                      isInProgress,
                      spectres,
                      pieceLineUp,
                      startGameLoop,
                    boardData,
                  }) => {

    return (
        <div className={'tetris'}>
            <div className={'main'}>
                <Board
                    isInProgress={isInProgress}
                    playerName={playerName}
                    pieceLineUp={pieceLineUp}
                    isPlayer={isPlaying}
                    boardData={boardData} />

                {leadPlayerName === playerName &&
                    <button onClick={()=>startGameLoop(roomName)}>START GAME</button>}

                <BoardMeta
                    roomName={roomName}
                    playerName={playerName}
                    isPlaying={isPlaying}
                    isInProgress={isInProgress}
                    leadPlayerName={leadPlayerName}
                />

            </div>
            <div className={'opponents'}>
                {spectres.filter(s=>s.playerName !== playerName).map((spectre, i) => (
                    <div key={i}>
                        <Spectre
                            size={'small'}
                            isInProgress={isInProgress}
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
        isPlaying: state.player.isPlaying,
        isInProgress: state.game.isInProgress,
        leadPlayerName: state.game.leadPlayerName,
        pieceLineUp: state.game.pieceLineUp,
        spectres: state.game.players.map(p=>({playerName: p.playerName, spectreData: p.spectre, isPlaying: p.isPlaying})),
        boardData: state.player.spectre
    }
}

const mapDispatchToProps = {startGameLoop}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom)



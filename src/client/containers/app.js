import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Board from '../components/board/board'
import BoardMeta from '../components/boardMeta/boardMeta'
import GameMeta from '../components/gameMeta/gameMeta'
import './app.scss'
import {parseOptions, redButton} from '../actions/gameActions'
import Game from "./Game"

const App = ({
                 match,
                 parseOptions,
                redButton,
                 roomName,
                 startError,
                readyGames,
                inProgressGames,
                 playerName}) => {

    //todo: move this somewhere else but ugh routing
    // parseOptions(match.params.boardOptions)

    return (
        <div className={'tetris'}>
            {playerName}
            <button onClick={redButton}>CLEAR ALL</button>
            <GameMeta
                readyGames={readyGames}
                inProgressGames={inProgressGames} />

            {!startError && <Game playerName={playerName} roomName={roomName} />}

            {startError && <div className={'error'}>{startError}</div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        playerNames: state.game.playerNames,
        startError: state.game.startError,
        roomName: state.game.roomName,
        playerName: state.player.playerName,
        isPlaying: state.player.isPlaying,
        readyGames: state.meta.readyGames,
        inProgressGames: state.meta.inProgressGames
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({parseOptions, redButton}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



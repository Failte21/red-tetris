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
                 roomName,
                 startError,
                userMessage,
                 playerName}) => {

    return (
        <div className={'tetris'}>

            {(!startError && roomName) && <Game playerName={playerName} roomName={roomName} />}
            {startError && <div className={'error'}>{startError}</div>}
            {userMessage && <div>{userMessage}</div>}

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        startError: state.meta.startError,
        userMessage: state.meta.userMessage,
        roomName: state.game.roomName,
        playerName: state.player.playerName
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



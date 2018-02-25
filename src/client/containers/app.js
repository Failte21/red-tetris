import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './app.scss'
import Game from "./Game"

const App = ({
                location,
                 roomName,
                 startError,
                userMessage,
                 playerName}) => {

    return (
        <div className={'tetris'}>
            Location: {location.hash}

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
        playerName: state.player.playerName,
        location: state.router.location
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './app.scss'
import Game from "./Game"

const App = ({
                 hash,
                 roomName,
                 errorMessage,
                 userMessage,
                 playerName}) => {

    return (
        <div className={'tetris'}>
            Location: {hash}<br/>
            ERROR: {errorMessage ? errorMessage : 'none'}<br/>
            MESSAGE: {userMessage ? userMessage : 'none'}<br/>

            {(playerName && roomName) && <Game playerName={playerName} roomName={roomName} />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.meta.errorMessage,
        userMessage: state.meta.userMessage,
        roomName: state.game.roomName,
        playerName: state.player.playerName,
        hash: state.router.location.hash
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '../styles/app.scss'
import Game from "./GameRoom"

const App = ({
                 roomName,
                 errorMessage,
                 userMessage,
                 playerName}) => {

    return (
        <div className={'tetris'}>
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
        playerName: state.player.playerName
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



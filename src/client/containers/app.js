import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Board from '../components/board/board'
import BoardMeta from '../components/boardMeta/boardMeta'
import GameMeta from '../components/gameMeta/gameMeta'
import './app.scss'
import { parseOptions } from '../actions/gameActions'

const App = ({
     match,
     parseOptions,
     roomName,
     startError,
     playerName,
     playerNames,
     isPlaying,
     readyGames,
     inProgressGames}) => {

    parseOptions(match.params.boardOptions)

    return (
        <div className={'tetris'}>
            <GameMeta
                readyGames={readyGames}
                inProgressGames={inProgressGames} />

            {!startError && <div className={'main'}>
                <Board size={'large'}/>
                <BoardMeta roomName={roomName} playerName={playerName} isPlaying={isPlaying} />
            </div>}
	        {!startError && <div className={'opponents'}>
                {playerNames.filter(p=>p !== playerName).map((o, i) => (
                            <div key={i}>
                                <Board size={'small'}/>
                                {o}
                            </div>
                ))}
            </div>}
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
    return bindActionCreators({parseOptions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



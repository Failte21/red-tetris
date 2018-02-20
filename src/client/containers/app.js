import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Board from '../components/board/board'
import './app.scss'
import { parseOptions } from '../actions/gameActions'

const App = ({match, parseOptions, boardName, startError, playerName, playerNames}) => {

    parseOptions(match.params.boardOptions)
    console.log('remaking App component')

    return (
        <div className={'tetris'}>
            {playerName}
            {!startError && <div className={'main'}>
                <Board size={'large'}/>
            </div>}
            <div className={'opponents'}>
                {playerNames.map((o, i) => {
                    if (o !== playerName)
                        return (
                            <div>
                                <Board key={i} size={'small'}/>
                                {o}
                            </div>
                        )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        message: state.message,
        playerNames: state.game.playerNames,
        startError: state.game.startError,
        boardName: state.game.boardName,
        playerName: state.player.playerName
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({parseOptions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



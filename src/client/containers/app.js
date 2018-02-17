import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Board from '../components/board/board'
import './app.scss'
import { parseOptions } from '../actions/gameActions'

const App = ({match, parseOptions}) => {

    parseOptions(match.params.boardOptions)
    return (
        <div className={'tetris'}>
            <div className={'main'}>
                <Board size={'large'}/>
            </div>
            <div className={'opponents'}>
                <Board size={'small'}/>
                <Board size={'small'}/>
                <Board size={'small'}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        message: state.message
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({parseOptions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



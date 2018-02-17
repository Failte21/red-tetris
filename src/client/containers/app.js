import React from 'react'
import { connect } from 'react-redux'
import Board from '../components/board/board'
import './app.scss'

const App = () => {
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
export default connect(mapStateToProps, null)(App)



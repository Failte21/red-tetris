import React from 'react'
import { connect } from 'react-redux'
import Board from '../components/board/board'


const App = () => {
  return (
    <Board />
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)



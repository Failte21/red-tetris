import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import App from './containers/app'

const AppRouter = ({history}) => (
    <ConnectedRouter history={history} >
            <Route component={App} />
    </ConnectedRouter>
)

export default AppRouter
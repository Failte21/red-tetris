import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import App from './containers/app'

const AppRouter = ({history}) => (
    <ConnectedRouter history={history} >
        <Switch>
            <Route component={App} />
        </Switch>
    </ConnectedRouter>
)

export default AppRouter
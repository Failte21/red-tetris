import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import App from './containers/app'

const AppRouter = ({history}) => (
    <ConnectedRouter history={history} >
        <Switch>
            <Route path='/' component={App} />
        </Switch>
    </ConnectedRouter>
)

export default AppRouter
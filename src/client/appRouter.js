import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import App from './containers/app'

const AppRouter = () => (
    <Router>
        <Switch>
            <Route path={'/:boardOptions'} component={App} />
            <Route component={App} />
        </Switch>
    </Router>
)

export default AppRouter
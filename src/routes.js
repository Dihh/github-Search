import React from "react"

import { BrowserRouter, Switch, Route } from "react-router-dom"

import search from './pages/search'
import details from './pages/details'

const Routes = () => (
    <BrowserRouter>
        <Switch>

            <Route path="/details/:user" component={details} />
            <Route path="/details/" component={details} />
            <Route path="/" component={search} />
        </Switch>
    </BrowserRouter>
)

export default Routes
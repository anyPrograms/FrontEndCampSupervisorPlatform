import React, { SFC, ReactNode } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';


const AppRoute: SFC = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/shop" component={Shop}></Route>
            <Redirect to="/"></Redirect>
        </Switch>
    )
}

export default AppRoute;
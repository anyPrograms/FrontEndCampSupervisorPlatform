import React, { Component } from 'react';
import './App.less';
import { Menu, Icon } from 'antd';
import { Redirect, BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';


const AppRoute = (props: any) => {
    return (
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route  path="/shop" component={Shop}></Route>
        </Switch>
    )
}

export default AppRoute;
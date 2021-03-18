import React from 'react';
import {Route,Switch } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Discharges from "../pages/Discharges";
import DischargeSummar from "../pages/DischargeSummar";
import Notfound from '../pages/Notfound';
import ErrorPage from '../pages/ErrorPage';
export const Routes = (props) => {
    return ( 
     <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard"  component={Dashboard} />
        <Route path="/discharges/:type" component={Discharges} />
        <Route path="/discharge-summary/:disid/:id/:type" component={DischargeSummar} />
        <Route path="/errorpage" component={ErrorPage} />
        <Route path="/404" component={Notfound} /> 
    </Switch>
    );
} 
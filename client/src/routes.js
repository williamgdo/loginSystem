import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import signIn from './pages/signIn'; 
import signUp from './pages/signUp'; 
import userDash from './pages/userDash'; 
import adminDash from './pages/adminDash'; 
import editInfo from './pages/editInfo'; 
import editAdm from './pages/editInfoAdmin'; 

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render = { props =>
        isAuthenticated() ? (
        <Component {...props} />
        ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }}/>
        )
      }
    />
);

  
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={signIn} />
            <Route exact path="/signUp" component={signUp} />
            <PrivateRoute path="/userDash" component={userDash} />
            <PrivateRoute path="/adminDash" component={adminDash} />
            <PrivateRoute exact path="/edit" component={editInfo} />
            <PrivateRoute exact path="/editAdmin" component={editAdm} />
            <Route path="*" component={() => <h1>Página não encontrada (erro 404)</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
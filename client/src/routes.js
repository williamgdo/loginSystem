import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main'; 
import userDash from './pages/userDash'; 
import adminDash from './pages/adminDash'; 
import editInfo from './pages/editInfo'; 
import editAdm from './pages/editInfoAdmin'; 

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={adminDash} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../views/dashboard';
import NotFound from '../views/404/notFound';
import CreateProject from '../views/CreateProject';
import Page from '../views/page';

import Signin from '../components/auth/signin';
import Twofactor from '../components/auth/twofactor';
import Signout from '../components/auth/signout';
import RequireAuth from '../components/auth/require_auth';

const Routes = () => (
   
    <Switch>
	    <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route exact path='/' component={Signin} />
		<Route path="/twofactor" component={Twofactor} />
		<Route path="/page" component={RequireAuth(Page)} />
        <Route path="/dashboard" component={RequireAuth(Dashboard)} />
		<Route exact path="/createProject" key="create-project" component={RequireAuth(CreateProject)} />
		<Route exact path="/viewedit" key="view-edit-project" component={RequireAuth(CreateProject)} />
        <Route exact path="/clone" key="clone-project" component={RequireAuth(CreateProject)} />
        <Route path="*" component={NotFound} />
    </Switch>
);

export default Routes;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import HomePage from '../Home';
import RatesPage from '../Rates';
import StaticsPage from '../Statics';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import AccountPage from '../Account';
import PasswordForgetPage from '../PasswordForget';

import * as ROUTES from '../../constants/Routes';

const App = () => (
    <Router>
       <div>
      <Navigation />

      <hr />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.RATES} component={RatesPage} />
        <Route exact path={ROUTES.STATICS} component={StaticsPage} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      </Switch>

    </div>
    </Router>
);
 
export default App;
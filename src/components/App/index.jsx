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
import { withAuthentication } from '../Session';
import logo from '../../logo.svg';
import './style.css'

const App = () => (
  <Router>
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Navigation />
        </header> 
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
        <footer className="App-footer">
          <p>Xchange 2019</p>
        </footer>
      </div>
  </Router>
);
 
export default withAuthentication(App);

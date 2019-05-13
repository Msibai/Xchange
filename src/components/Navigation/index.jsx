import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/Routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import './style.css';

const Navigation = () => (
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <NavigationAuth /> : <NavigationNonAuth />
        }
      </AuthUserContext.Consumer>
    </div>
  );

const NavigationAuth = () => (
    <div className="navigation">
        <ul>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.RATES}>Rates</Link>
            </li>
            <li>
                <Link to={ROUTES.STATICS}>Statics</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <SignOutButton />
            </li>
        </ul>
    </div>
);

const NavigationNonAuth = () => (
  <div className="navigation">
    <ul>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  </div>
);
 
export default Navigation;

import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/Routes';
import SignOutButton from '../SignOut';

const Navigation = ({ authUser }) => (
    <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
    <div>
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
    <ul>
      <li>
        <Link to={ROUTES.HOME}>Home page</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
);
 
export default Navigation;

import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/Routes';

const Navigation = () => (
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
                <Link to={ROUTES.SIGN_UP}>Sign up</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign in</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
        </ul>
    </div>
);
 
export default Navigation;
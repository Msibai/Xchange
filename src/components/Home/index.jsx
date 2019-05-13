import React from 'react';
import { AuthUserContext } from '../Session';
import { SignInForm } from '../SignIn';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import './style.css';

const Home = () => (
  <div className="main">
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <HomeAuth /> : <HomeNonAuth />
        }
      </AuthUserContext.Consumer>
   </div>
);

const HomeAuth = () => (
  <div>
    <section className="intro">
      <h1>X-Change</h1>
      <p>Here you find rates for different currencies and can compare, amongst others, the rates are obtained from <b>European Central Bank.</b></p>
      <p>You can get also the historical rates for any day since 1999.</p>
    </section>
    <h2>Welcome UserName</h2>
  </div>
);

const HomeNonAuth = () => (
  <div>
    <section className="intro">
      <h1>X-Change</h1>
      <p>Here you find rates for different currencies and can compare, amongst others, the rates are obtained from <b>European Central Bank.</b></p>
      <p>You can get also the historical rates for any day since 1999.</p>
    </section>
    <div className="login">
      <h1>Sign In to your account</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  </div>
);

export default Home;

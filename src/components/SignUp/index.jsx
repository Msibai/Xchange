import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/Routes';



const SignUp = () => (
    <div>
        <h1>Create an Account</h1>
        <SignUpForm />
    </div>
);

const CURRENCY_NAMES = {
    'SEK':'Swedish krona',
    'USD': 'US dollar',
    'JPY': 'Japanese yen',
    'BGN': 'Bulgarian lev',
    'CZK': 'Czech koruna',
    'DKK': 'Danish krone',
    'GBP': 'Pound sterling',
    'HUF': 'Hungarian forint',
    'PLN': 'Polish zloty',
    'RON': 'Romanian leu',
    'CHF': 'Swiss franc',
    'ISK': 'Icelandic krona',
    'NOK': 'Norwegian krone',
    'HRK': 'Croatian kuna',
    'RUB': 'Russian rouble',
    'TRY': 'Turkish lira',
    'AUD': 'Australian dollar',
    'BRL': 'Brazilian real',
    'CAD': 'Canadian dollar',
    'CNY': 'Chinese yuan renminbi',
    'HKD': 'Hong Kong dollar',
    'IDR': 'Indonesian rupiah',
    'ILS': 'Shekel',
    'INR': 'Indian rupee',
    'KRW': 'South Korean won',
    'MXN': 'Mexican peso',
    'MYR': 'Malaysian ringgit',
    'NZD': 'New Zealand dollar',
    'PHP': 'Philippine peso',
    'SGD': 'Singapore dollar',
    'THB': 'Thai baht',
    'ZAR': 'South African rand',
    'EUR': 'Euro',
};

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    baseCurrency: '',
    email: '',
    passowrd: '',
    passwordConfirmation: '',
    error: null,    
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const { firstName, lastName, baseCurrency, email, password } = this.state;
    
        this.props.firebase
          .doCreateUserWithEmailAndPassword(firstName, lastName, baseCurrency, email, password)
          .then(authUser => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
    
        event.preventDefault();
      };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    renderCodes() {
        return(Object.entries(CURRENCY_NAMES).map((item, i) => (<option value={item[0]} key={i}>{item[1]}</option>)));
    }

    render() {
        const {
            firstName,
            lastName,
            baseCurrency,
            email,
            password,
            passwordConfirm,
            error,
        } = this.state;
        
        const isInvalid =
            password !== passwordConfirm ||
            password === '' ||
            email === '' ||
            firstName === '' ||
            lastName === '' ||
            baseCurrency === '';
        
        return (
            <form onSubmit={this.onSubmit}>
                <label>First Name</label>
                <input
                    name="firstName"
                    value={firstName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="First Name*"
                />
                <label>Last Name</label>
                <input
                    name="lastName"
                    value={lastName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Last Name*"
                />
                <label>Base Currency</label>
                <select name="baseCurrency" value ={baseCurrency} onChange={this.onChange}>
                    <option value="">Please select Currency*</option>
                    {this.renderCodes()}              
                </select>
                <label>Email</label>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address*"
                />
                <label>Password</label>
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password*"
                    autoComplete="New Password"
                />
                <label>Please confirm your password</label>
                <input
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password*"
                    autoComplete="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">Sign Up</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );

  const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);

export default SignUp;

export { SignUpForm, SignUpLink };

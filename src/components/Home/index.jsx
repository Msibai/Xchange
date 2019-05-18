import React from 'react';
import { AuthUserContext } from '../Session';
import { SignInForm } from '../SignIn';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import './style.css';
import { withFirebase } from '../Firebase';

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

class Home extends  React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
    }
  }

  getUserName = () => this.props.firebase.auth.onAuthStateChanged((user) => {
    var firstName;
    var lastName;
    var self = this;
    if (user) {
      this.props.firebase.db.ref('/users/' + user.uid).once('value').then(function(snapshot) {
        firstName = (snapshot.val() && snapshot.val().firstName) || 'Anonymous';
        lastName = (snapshot.val() && snapshot.val().lastName) || 'Anonymous';
        if (self._isMounted) {
          self.setState({fName: firstName, lName: lastName })
        }
        
      });
    } 
  });
  
  componentDidMount() {
    this._isMounted = true;
    this.getUserName()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() { 
    return(
      <div className="main">
        <AuthUserContext.Consumer>
          {authUser =>
            authUser 
            ? (
              <div>
              <section className="intro">
                <h1>X-Change</h1>
                <h2>Welcome {this.state.fName}</h2>
                <p>Here you find rates for different currencies and can compare, amongst others, the rates are obtained from <b>European Central Bank.</b></p>
                <p>You can get also the historical rates for any day since 1999.</p>
              </section>
            </div>
            ) 
            : <HomeNonAuth />
          }
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

export default withFirebase(Home);

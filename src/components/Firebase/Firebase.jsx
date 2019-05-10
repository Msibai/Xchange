import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBTeYVSAp16yxZi-Lv-BCOHNlsumh6Ob8A",
    authDomain: "xchange-e88b9.firebaseapp.com",
    databaseURL: "https://xchange-e88b9.firebaseio.com",
    projectId: "xchange-e88b9",
    storageBucket: "xchange-e88b9.appspot.com",
    messagingSenderId: "853829597222"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (firstName, lastName, baseCurrency, email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  }

export default Firebase;

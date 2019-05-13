import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (firstName, lastName, baseCurrency, email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  getUserName = () => this.auth.onAuthStateChanged((user) => {
    if (user) {
      this.db.ref('/users/' + user.uid).once('value').then(function(snapshot) {
        var firstName = (snapshot.val() && snapshot.val().firstName) || 'Anonymous';
        var lastName = (snapshot.val() && snapshot.val().lastName) || 'Anonymous';
        console.log(firstName, lastName)
      });
    } 
  });

  getUserBase = () => this.auth.onAuthStateChanged((user) => {
    if (user) {
      this.db.ref('/users/' + user.uid).once('value').then(function(snapshot) {
        var defaultBase = (snapshot.val() && snapshot.val().baseCurrency) || 'Anonymous';
        console.log(defaultBase)
      });
    } 
  });

}

export default Firebase;

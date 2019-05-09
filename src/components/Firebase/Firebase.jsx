import app from 'firebase/app';

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
    }
}

export default Firebase;
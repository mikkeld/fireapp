const firebase = require("firebase");

const config = {
    apiKey: "AIzaSyBFl2Lre7t7u-8cwtYUu0k3gjrD0iQ3cWs",
    authDomain: "friendlychat-61656.firebaseapp.com",
    databaseURL: "https://friendlychat-61656.firebaseio.com",
    storageBucket: "friendlychat-61656.appspot.com",
};
firebase.initializeApp(config);

class Firebase {
    constructor(storageRef) {
        this.ref = firebase.database().ref(storageRef);
    }

    insertItem(item) {
        return this.ref.push().set(item);
    }
}

module.exports = Firebase;
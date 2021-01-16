const firebase = require('firebase/app');
require('firebase/firestore');

const config = {
    apiKey: "AIzaSyC1Dj7ciyQ0pj3ViyXe0r6hJR6hel6pRlI",
    authDomain: "hotcoffeepot-339b1.firebaseapp.com",
    databaseURL: "https://hotcoffeepot-339b1-default-rtdb.firebaseio.com",
    projectId: "hotcoffeepot-339b1",
    storageBucket: "hotcoffeepot-339b1.appspot.com",
    messagingSenderId: "867181054237",
    appId: "1:867181054237:web:c6584c0382372e7fc279f4",
    measurementId: "G-24MXD1K68C"
  };

firebase.initializeApp(config);

export default firebase;
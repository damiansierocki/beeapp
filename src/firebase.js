import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyDbewWOcqyNkqTQproXST9sDvBh1rH968Y",
    authDomain: "beeapp-3b747.firebaseapp.com",
    databaseURL: "https://beeapp-3b747.firebaseio.com",
    projectId: "beeapp-3b747",
    storageBucket: "beeapp-3b747.appspot.com",
    messagingSenderId: "207831245884",
    appId: "1:207831245884:web:45e1105890b89036714f39"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");

// export utils/refs
export { db, auth, usersCollection };

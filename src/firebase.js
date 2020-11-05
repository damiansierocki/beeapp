import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyDQ0OAW_bYQQXxttwmw-LKSx6k6anmMk8A",
    authDomain: "beeapp-b85f0.firebaseapp.com",
    databaseURL: "https://beeapp-b85f0.firebaseio.com",
    projectId: "beeapp-b85f0",
    storageBucket: "beeapp-b85f0.appspot.com",
    messagingSenderId: "829054067574",
    appId: "1:829054067574:web:bf15498e39d448bcf41057"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");

// export utils/refs
export { db, auth, usersCollection };

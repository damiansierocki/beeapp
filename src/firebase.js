import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyCfvH0eSExaT62HwQ9KblFh-xxlrOzNs5o',
  authDomain: 'beeapp-e6515.firebaseapp.com',
  databaseURL: 'https://beeapp-e6515.firebaseio.com',
  projectId: 'beeapp-e6515',
  storageBucket: 'beeapp-e6515.appspot.com',
  messagingSenderId: '196441194159',
  appId: '1:196441194159:web:cfe53ce1f4f40dcf399e5a'
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection('users');

// export utils/refs
export { db, auth, usersCollection };

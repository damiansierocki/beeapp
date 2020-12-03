import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: 'AIzaSyAsGTRShu3VWiBtM8aSR7quCqff3Y3ay9E',
    authDomain: 'beeapp-62f71.firebaseapp.com',
    projectId: 'beeapp-62f71',
    storageBucket: 'beeapp-62f71.appspot.com',
    messagingSenderId: '956205510168',
    appId: '1:956205510168:web:ecfa09d1fa4ced6d27dd6d',
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection('users');

// export utils/refs
export { db, auth, usersCollection };

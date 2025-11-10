import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAa-OFX8SAa2-Wybuei2jP5HJfHGER0s4A',
  authDomain: 'freeandreduced-ac6d8.firebaseapp.com',
  projectId: 'freeandreduced-ac6d8',
  storageBucket: 'freeandreduced-ac6d8.firebasestorage.app',
  messagingSenderId: '531547556984',
  appId: '1:531547556984:web:88d68089be52efd462f18d',
  measurementId: 'G-73563EVMSM',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };

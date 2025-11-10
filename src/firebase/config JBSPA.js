import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAKv_aQ_NPeCEJ1DtFI7jQ5LwRbCRuk2zY",
    authDomain: "muso-ninjas-80a45.firebaseapp.com",
    databaseURL: "https://muso-ninjas-80a45-default-rtdb.firebaseio.com",
    projectId: "muso-ninjas-80a45",
    storageBucket: "muso-ninjas-80a45.appspot.com",
    messagingSenderId: "291349137246",
    appId: "1:291349137246:web:2a5abfa865905af64b71cf"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig)

  // init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  // timestamp
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, projectAuth, projectStorage, timestamp }


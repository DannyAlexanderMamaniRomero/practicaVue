import firebase from 'firebase/app';
import 'firebase/firestore'
import store from '../store.js';

async function getFirestore () {
    const firestore = firebase.firestore()
    try {
      await firestore.enablePersistence()
    } catch (err) {
      console.log('err.code → ', err.code)
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a a time.

      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        return firestore
      }
    }
    return firestore
  }

const config = {
    apiKey: "AIzaSyDVfZunWBrUd2JxCFqJE1MTLXxFCULIlMg",
    authDomain: "ifeep-ad.firebaseapp.com",
    databaseURL: "https://ifeep-ad.firebaseio.com",
    projectId: "ifeep-ad",
    storageBucket: "ifeep-ad.appspot.com",
    messagingSenderId: "317208088132"
};

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(user => {
  getFirestore().then(db => {
    if (user) {
      // Signed in. Let Vuex Easy Firestore know.
      console.log(user)
      //store.dispatch('users/openDBChannel') // open the DB channels
    } else {
      // Signed out. Let Vuex know.
      store.dispatch('resetStore', null)
    }
  })
})
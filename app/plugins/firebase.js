import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBGDZHM33LSDMBxDfcZDKL-hosJd7Omk4I",
    authDomain: "nuxt-sample-22587.firebaseapp.com",
    databaseURL: "https://nuxt-sample-22587.firebaseio.com",
    projectId: "nuxt-sample-22587",
    storageBucket: "nuxt-sample-22587.appspot.com",
    messagingSenderId: "560047851982"
  })
}

export default firebase

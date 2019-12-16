import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyC76Juw8rMxbeVDbIm_ABL-IIhssVDDDn8',
    authDomain: 'e-merse.firebaseapp.com',
    databaseURL: 'https://e-merse.firebaseio.com',
    projectId: 'e-merse',
    storageBucket: 'e-merse.appspot.com',
    messagingSenderId: '662994060989',
    appId: '1:662994060989:web:1d12d6821c656a54'
  }
  firebase.initializeApp(firebaseConfig)
}

export const authProviders = {
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  Facebook: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  Email: firebase.auth.EmailAuthProvider.PROVIDER_ID,
  Phone: firebase.auth.PhoneAuthProvider.PROVIDER_ID
}
export const db = firebase.database()
export const storage = firebase.storage()
export const auth = firebase.auth()

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyA1frqipSZPFk61yfDQ9-uGSYXDuwxqdAg',
    authDomain: 'geounity.firebaseapp.com',
    databaseURL: 'https://geounity.firebaseio.com',
    projectId: 'geounity',
    storageBucket: 'geounity.appspot.com',
    messagingSenderId: '675273107835',
    appId: '1:675273107835:web:782de361cc4c04f0'
  }
  firebase.initializeApp(config)
}

export const authProviders = {
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  Facebook: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  Twitter: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  Github: firebase.auth.GithubAuthProvider.PROVIDER_ID,
  Email: firebase.auth.EmailAuthProvider.PROVIDER_ID
}

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()

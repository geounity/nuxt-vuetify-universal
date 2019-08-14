import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import env from '../plugins/config'
if (!firebase.apps.length) {
  const config = {
    apiKey: env.firebase.apiKey,
    authDomain: env.firebase.authDomain,
    databaseURL: env.firebase.databaseURL,
    projectId: env.firebase.projectId,
    storageBucket: env.firebase.storageBucket,
    messagingSenderId: env.firebase.messagingSenderId,
    appId: env.firebase.appId
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

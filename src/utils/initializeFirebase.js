import firebase from 'firebase';

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_KEY,
      authDomain: 'fir-auth-aab3a.firebaseapp.com'
    });
  }
};
export const auth = firebase.auth;

import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAMOoiG9gUKwQTELizGsCAxXk1KOVtIvFU',
  authDomain: 'fir-auth-aab3a.firebaseapp.com',
  projectId: 'fir-auth-aab3a',
  storageBucket: 'fir-auth-aab3a.appspot.com',
  messagingSenderId: '108361610585',
  appId: '1:108361610585:web:211a0e6afaff5d70444848'
};

export const app = firebase.initializeApp(firebaseConfig);

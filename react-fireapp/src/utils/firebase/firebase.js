import {firebaseConfig} from './config';
import firebase from 'firebase/app';
import 'firebase/database';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
// export const firebaseAuth = firebase.auth();
export const firebaseDb = firebase.database();
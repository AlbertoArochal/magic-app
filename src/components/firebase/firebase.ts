// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDfWpTPYRa3c2SlR2J7HIaxCoHFYPt6f50',
    authDomain: 'magic-vault-2764f.firebaseapp.com',
    databaseURL: 'https://magic-vault-2764f-default-rtdb.firebaseio.com',
    projectId: 'magic-vault-2764f',
    storageBucket: 'magic-vault-2764f.appspot.com',
    messagingSenderId: '25105370888',
    appId: '1:25105370888:web:c24b2f24e049c4c487a6bd',
};

// Initialize Firebase
export const FireApp = initializeApp(firebaseConfig);
export const auth = getAuth(FireApp);
export const Firedb = getDatabase(FireApp);
export const provider = new GoogleAuthProvider();

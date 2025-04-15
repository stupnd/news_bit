// firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyATQC4EIL0LNxZ4Au-OecAWbSR1HfK_VYo",
    authDomain: "bit-news-2081f.firebaseapp.com",
    projectId: "bit-news-2081f",
    storageBucket: "bit-news-2081f.firebasestorage.app",
    messagingSenderId: "820806962905",
    appId: "1:820806962905:web:33f8902568ce56910f38c8",
    measurementId: "G-3R1JFSPPE2"
  };

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh51b15XlbShMIeETE3iroRxMpaPaUM5M",
  authDomain: "edusharp-de629.firebaseapp.com",
  databaseURL: "https://edusharp-de629-default-rtdb.firebaseio.com",
  projectId: "edusharp-de629",
  storageBucket: "edusharp-de629.appspot.com",
  messagingSenderId: "257078871465",
  appId: "1:257078871465:web:b99db41c817dc5f85ff0b8",
  measurementId: "G-N8ZZCGZCG1"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth ,firestore, storage}; 
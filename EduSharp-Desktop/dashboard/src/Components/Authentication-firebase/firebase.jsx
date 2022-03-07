
import firebase from 'firebase';
import 'firebase/database'

const Config = {
  apiKey: "AIzaSyBWKSbPloiNsWtwSkB3HVwkM-mlTV0gwxE",
  authDomain: "edusharp-auth.firebaseapp.com",
  projectId: "edusharp-auth",
  storageBucket: "edusharp-auth.appspot.com",
  messagingSenderId: "697340654972",
  appId: "1:697340654972:web:7d7621a7f6260a28e020f9",
  measurementId: "G-4WXVFRH7L6"
};


firebase.initializeApp(Config);

export default firebase.database()

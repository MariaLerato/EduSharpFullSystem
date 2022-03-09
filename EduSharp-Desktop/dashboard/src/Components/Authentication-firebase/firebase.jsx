
import firebase from 'firebase';
import 'firebase/database'

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


firebase.initializeApp(firebaseConfig);

export default firebase.database()
 
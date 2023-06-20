import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiT_KgDIS46OtE5gW8xRCxsodK9QTCpPY",
  authDomain: "writerightrn.firebaseapp.com",
  projectId: "writerightrn",
  storageBucket: "writerightrn.appspot.com",
  messagingSenderId: "995317730153",
  appId: "1:995317730153:web:6e3849c7593bb1062dcbf8",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

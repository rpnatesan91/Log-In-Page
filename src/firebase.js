import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyD03icDnOsj8Pp8bJiZJQj3qLsXSvhNI_Y",
  authDomain: "myreputation-be192.firebaseapp.com",
  projectId: "myreputation-be192",
  storageBucket: "myreputation-be192.appspot.com",
  messagingSenderId: "1086608452071",
  appId: "1:1086608452071:web:7f0a2be533e060bf147542",
  measurementId: "G-W8TMJV2VDV",
});

export const auth = app.auth()
export const storage = app.storage()
export default app

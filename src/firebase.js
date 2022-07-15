// FROM FIREBASE
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Import Firebase
// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl3Qq8cDgVFYxMQk8N9RHlT8puI_DQnto",
  authDomain: "simple-global-chat-app.firebaseapp.com",
  projectId: "simple-global-chat-app",
  storageBucket: "simple-global-chat-app.appspot.com",
  messagingSenderId: "963514506099",
  appId: "1:963514506099:web:88d6363a7f858ce73fc306",
  measurementId: "G-FLZ1Q11T0Q",
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;

// FROM FIREBASE
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

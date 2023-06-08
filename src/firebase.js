// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNVjCPcmh5fm34oZXWqt_z92dyEZSBfnk",
  authDomain: "team1-original-app.firebaseapp.com",
  projectId: "team1-original-app",
  storageBucket: "team1-original-app.appspot.com",
  messagingSenderId: "465770931022",
  appId: "1:465770931022:web:95ca0155dc9c8de371b41f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export { getAuth, signInWithPopup, GoogleAuthProvider };

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNVjCPcmh5fm34oZXWqt_z92dyEZSBfnk",
  authDomain: "team1-original-app.firebaseapp.com",
  projectId: "team1-original-app",
  storageBucket: "team1-original-app.appspot.com",
  messagingSenderId: "465770931022",
  appId: "1:465770931022:web:95ca0155dc9c8de371b41f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  app,
  db,
  // firestoreからのimport
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  // authからのimport
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  signOut,
};

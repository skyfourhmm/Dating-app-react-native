// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAh8z9_TewIlcEMgFMCHEQjVi-54UaUp0",
  authDomain: "datingappmobile.firebaseapp.com",
  databaseURL: "https://datingappmobile-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "datingappmobile",
  storageBucket: "datingappmobile.firebasestorage.app",
  messagingSenderId: "461411241830",
  appId: "1:461411241830:web:8663826bea1f19f76cc2a7",
  measurementId: "G-JB3P0SX1QJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export const database = getFirestore();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPyzTYGir8ioU-Yi2l43txu6OsDNpteWE",
  authDomain: "todolist-979ba.firebaseapp.com",
  projectId: "todolist-979ba",
  storageBucket: "todolist-979ba.appspot.com",
  messagingSenderId: "928565550575",
  appId: "1:928565550575:web:2f21b7ccce7389b7f0aa1a",
  measurementId: "G-303EDZP1CV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth();
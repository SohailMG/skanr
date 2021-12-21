// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQXAkT6lN2C6n76wch2xiIMGZC21POErY",
  authDomain: "scannitor-app.firebaseapp.com",
  projectId: "scannitor-app",
  storageBucket: "scannitor-app.appspot.com",
  messagingSenderId: "498207515476",
  appId: "1:498207515476:web:0e4819bc9903869ba29ec1",
  measurementId: "G-P6692XFKGD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth,db}

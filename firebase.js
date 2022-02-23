// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXUKIPnZ6XpxtoJej3KwhgLgy3o5Dmxoc",
  authDomain: "skanr-app.firebaseapp.com",
  projectId: "skanr-app",
  storageBucket: "skanr-app.appspot.com",
  messagingSenderId: "1062052978371",
  appId: "1:1062052978371:web:ffad0d7db314ae63608c76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});
const auth = getAuth();
const db = getFirestore();

export { auth, db };

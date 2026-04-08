// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwFJ34onS-iy_rDtchbGtag3sE_ywqY8U",
  authDomain: "maria-jaega.firebaseapp.com",
  projectId: "maria-jaega",
  storageBucket: "maria-jaega.firebasestorage.app",
  messagingSenderId: "818254636026",
  appId: "1:818254636026:web:439c894f9919857cad7a43",
  measurementId: "G-R5F9EXQ986"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjLOp2xGqr-ObaMLtfDyYNKJw40drpnB4",
  authDomain: "netflixgpt-5b0a3.firebaseapp.com",
  projectId: "netflixgpt-5b0a3",
  storageBucket: "netflixgpt-5b0a3.firebasestorage.app",
  messagingSenderId: "289486171832",
  appId: "1:289486171832:web:ca64f56c2825ac3af10e4d",
  measurementId: "G-DL96Q1PEY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
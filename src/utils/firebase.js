// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc0lWQRfhD2OHPol2FGJv-ObEjCa2qvEw",
  authDomain: "walkinhub-4380b.firebaseapp.com",
  projectId: "walkinhub-4380b",
  storageBucket: "walkinhub-4380b.firebasestorage.app",
  messagingSenderId: "375013147842",
  appId: "1:375013147842:web:43b6155d57635bf7a5e75b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
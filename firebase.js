// Import the specific functions you need from Firebase SDK
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Add other Firebase services you need, like Firestore or Storage, here:
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "your-savior.firebaseapp.com",
  projectId: "your-savior",
  storageBucket: "your-savior.appspot.com",
  messagingSenderId: "12161338293",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-LCHX9SLWH8"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firebase Authentication and export it for use in your component
const auth = getAuth(app);

export { auth };

// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYWhk5NwZp-blKkKPVMBZ9nn7qibOkLLI",
  authDomain: "your-savior.firebaseapp.com",
  projectId: "your-savior",
  storageBucket: "your-savior.appspot.com",
  messagingSenderId: "12161338293",
  appId: "1:12161338293:web:2042e984bf635f721f67fc",
  measurementId: "G-LCHX9SLWH8"
};
// Initialize Firebase
const firebaseObj =firebase.default
let app;
if (firebaseObj.apps.length === 0){
    app=firebaseObj.initializeApp(firebaseConfig);
}else{
    app=firebaseObj.app()
}
const auth=firebaseObj.auth();

export {auth};
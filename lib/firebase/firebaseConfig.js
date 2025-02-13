// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHpai82HvrQ0AZ60nOhJHFc2WrHF56LG8",
  authDomain: "iot-1-d62f6.firebaseapp.com",
  projectId: "iot-1-d62f6",
  storageBucket: "iot-1-d62f6.firebasestorage.app",
  messagingSenderId: "1058705996534",
  appId: "1:1058705996534:web:fb1b035baaf2e66437cad7",
  measurementId: "G-288K655LCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
const db=getFirestore(app)
export {auth,provider,db}
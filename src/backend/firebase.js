// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDz7BSnnKWSc13xAIebm2UFVqYBnlf8aZM",
  authDomain: "nursery2-69071.firebaseapp.com",
  projectId: "nursery2-69071",
  storageBucket: "nursery2-69071.firebasestorage.app",
  messagingSenderId: "974247736624",
  appId: "1:974247736624:web:94591429bc09b0e938c4f5",
  measurementId: "G-33D2250T4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const db=getFirestore(app);
export default app;
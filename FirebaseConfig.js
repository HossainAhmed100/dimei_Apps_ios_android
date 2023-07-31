import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsd8lhxZoAua6_b2WXzyLwoK5irTS3gtc",
  authDomain: "gima-john-auth.firebaseapp.com",
  projectId: "gima-john-auth",
  storageBucket: "gima-john-auth.appspot.com",
  messagingSenderId: "969145634713",
  appId: "1:969145634713:web:1066e7bef871b43a3e0d08"
};


// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
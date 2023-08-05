import React, { createContext, useEffect, useState } from "react";
import { View, Text } from 'react-native';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
import axios from "axios";
import { auth } from "../FirebaseConfig";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoding, setUserLoding] = useState(true);
    const provider = new GoogleAuthProvider();
  
    // Create a User
    const createUser = (email, password) => {
      setUserLoding(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    // Login user With Email and Password
    const userLogin = (email, password) => {
      setUserLoding(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    // User Info Update
    const updateUser = (userInfo) => {
      return updateProfile(auth.currentUser, userInfo);
    };
  
    // Fetch User Data From Firebase
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        const email = currentUser?.email; 
        const getUserDataFromMongo = async () => {
           await axios.get(`http://192.168.1.3:5000/signleUser/${email}`)  
            .then((res) => {
              setUser(res.data)
              setUserLoding(false);
            }) 
        }
        getUserDataFromMongo()
      });
  
      return () => unsubscribe();
    }, []);
  
    // Log out User
    const logOut = () => {
      setUserLoding(true);
      return signOut(auth);
    };
  
    // Forgat Password Action
    const forgatPassword = (email) => {
      return sendPasswordResetEmail(auth, email);
    };
  
    // SignIn with Google
    const signinGooglePopup = () => {
      return signInWithPopup(auth, provider);
    };
  
    const authInfo = {
      createUser,
      userLogin,
      user,
      logOut,
      updateUser,
      userLoding,
      forgatPassword,
      signinGooglePopup,
    };
  
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };
  

export default AuthProvider
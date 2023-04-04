import React, { createContext, useContext,useState,useEffect } from 'react'
import { Text, View ,StyleSheet} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {auth} from '../firebase'
import NavBar from '../components/NavBar';
// import { getAuth, signInWithCustomToken } from "firebase/auth";
const AuthContext = createContext({});
export   const AuthProvider =({children})=> {
    const [User, setUser]= useState('')
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
      setUser(`${auth.currentUser?.email}`) 
      // console.log(auth.currentUser?.email.toLowerCase())   
      })})
    
      // const route = useRoute();
      // console.log(this.props.route.name)
    return (
      <>
      <AuthContext.Provider value={{
        // user:`${auth.currentUser?.email}`,
        user:User,
      }}>
        {children }
      </AuthContext.Provider>
       {User!='undefined' && 
      <NavBar/>
      }
      </>
    )
}
export default function useAuth(){
    return useContext(AuthContext)
};

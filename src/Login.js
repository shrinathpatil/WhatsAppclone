import React from 'react'
import "./Login.css"
import { Button } from '@mui/material'
import { auth,provider } from './firebase-config'
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { actionTypes } from './Reducer';
import { useStateValue } from './StateProvider';


export default function Login() {

const [{},dispatch]=useStateValue();
const signIn=()=>{
   signInWithPopup(auth,provider)
    .then((result)=>{
      dispatch({
        type:actionTypes.SET_USER,
        user:result.user,
      });
    })
    .catch((error)=>alert(error.message));

}
  return (
    <div className='login'>
    <div className='login-container'>
     <img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' alt=''/>
        <div className='login-text'>
            <h1>Sign in to WhatsApp</h1>
        </div>
     <Button typpe="submit" onClick={signIn} >
     Sign In with Google
     </Button>
    </div>
       
    
    </div>
  )
}


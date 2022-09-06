import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
import {GoogleAuthProvider,getAuth} from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDh94DA8mnjnk0alRTUFjfezthCVyqD6bE",
    authDomain: "whats-app-clone-77764.firebaseapp.com",
    databaseURL: "https://whats-app-clone-77764-default-rtdb.firebaseio.com",
    projectId: "whats-app-clone-77764",
    storageBucket: "whats-app-clone-77764.appspot.com",
    messagingSenderId: "648831335465",
    appId: "1:648831335465:web:dbd8a9996eea0bc31f3038",
    measurementId: "G-VZ27XTVPEF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {auth,provider};
export const db=getFirestore(app);
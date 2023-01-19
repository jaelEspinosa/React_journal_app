// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-cursos-932d9.firebaseapp.com",
  projectId: "react-cursos-932d9",
  storageBucket: "react-cursos-932d9.appspot.com",
  messagingSenderId: "488802568589",
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FireBaseDB   = getFirestore( FirebaseApp )

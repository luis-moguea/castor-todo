// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "castor-todo-app.firebaseapp.com",
  projectId: "castor-todo-app",
  storageBucket: "castor-todo-app.appspot.com",
  messagingSenderId: "509109392121",
  appId: "1:509109392121:web:7ffc8088351a4bb76e0828"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
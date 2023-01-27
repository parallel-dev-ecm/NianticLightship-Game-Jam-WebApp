import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyCsuu5Z23-Yw7-JUxtet3En80XCmSHG4LE",
  authDomain: "ar-tists.firebaseapp.com",
  projectId: "ar-tists",
  storageBucket: "ar-tists.appspot.com",
  messagingSenderId: "839890688365",
  appId: "1:839890688365:web:5e884a6f9aa16b00126264",
  measurementId: "G-CSTC95X30R",
});


const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
export const FIREBASE_OBJECTS = { auth, storage, firestore };

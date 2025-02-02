import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBHTqL11KX5ABF6TCplCaVoTIJw0Flv1L4",
  authDomain: "boltmushroom.firebaseapp.com",
  projectId: "boltmushroom",
  storageBucket: "boltmushroom.firebasestorage.app",
  messagingSenderId: "993175391279",
  appId: "1:993175391279:web:7f3da09b41e2a2a19e8ada",
  measurementId: "G-2T8HFTC88L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
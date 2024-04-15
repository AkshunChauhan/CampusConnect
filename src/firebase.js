import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/storage';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpBQ2HrCURYsKvqTKQnpO_TiJjb956pOI",
  authDomain: "campusconnect-10901.firebaseapp.com",
  projectId: "campusconnect-10901",
  storageBucket: "campusconnect-10901.appspot.com",
  messagingSenderId: "1076337721495",
  appId: "1:1076337721495:web:1fe749ff4f6fd1f62ea9d2",
  measurementId: "G-219N5ZL046"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
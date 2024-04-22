import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/storage';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAi0XdaHsQra_5ArgRywIsjUn29YY0H8I",
  authDomain: "social-media-image-store.firebaseapp.com",
  projectId: "social-media-image-store",
  storageBucket: "social-media-image-store.appspot.com",
  messagingSenderId: "724098105112",
  appId: "1:724098105112:web:4119a34ea15277bf66a86d"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import {getStorage}  from "firebase/storage"
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: "blogwarden-9f8d5.firebaseapp.com",
  projectId: "blogwarden-9f8d5",
  storageBucket: "blogwarden-9f8d5.firebasestorage.app",
  messagingSenderId: process.env.FB_MESSAGE_SENDER_ID,
  appId: process.env.FB_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export {storage}
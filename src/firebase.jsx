// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_KCeU8wcVSkgokfX8ru9qYGEOYfhmuCg",
  authDomain: "same-app-c0bd3.firebaseapp.com",
  databaseURL: "https://same-app-c0bd3-default-rtdb.firebaseio.com",
  projectId: "same-app-c0bd3",
  storageBucket: "same-app-c0bd3.appspot.com",
  messagingSenderId: "702665999327",
  appId: "1:702665999327:web:a99286e37b3216934cfa6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcItUIdWwLBcWu2bsl8BpxreZEiS9UTb0",
  authDomain: "fir-firestore-779e8.firebaseapp.com",
  projectId: "fir-firestore-779e8",
  storageBucket: "fir-firestore-779e8.appspot.com",
  messagingSenderId: "1003893961699",
  appId: "1:1003893961699:web:436c71a36f78b2ae9fe6d6",
  measurementId: "G-0LGC27H68W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const analytics = getAnalytics(app);
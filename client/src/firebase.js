// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-8ceed.firebaseapp.com",
    projectId: "mern-blog-8ceed",
    storageBucket: "mern-blog-8ceed.appspot.com",
    messagingSenderId: "746582689711",
    appId: "1:746582689711:web:270da3f63e0ac905c8915a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
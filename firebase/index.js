// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpg86LfxXUASuZeAct6OzoaHSUxeeXuu8",
  authDomain: "honey-do-3992d.firebaseapp.com",
  projectId: "honey-do-3992d",
  storageBucket: "honey-do-3992d.appspot.com",
  messagingSenderId: "63605119569",
  appId: "1:63605119569:web:d0aea61958845bb13ff670"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//connect auth
const auth = getAuth(app);

//connect firestore
const db = getFirestore(app);

export { auth, db };
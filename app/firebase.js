import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA6QcmkI5w7XXqtBbA6_sKkHkNC5YxutZ4",
  authDomain: "test-eaf76.firebaseapp.com",
  projectId: "test-eaf76",
  storageBucket: "test-eaf76.appspot.com",
  messagingSenderId: "594882827001",
  appId: "1:594882827001:web:6a052d532aa2ffaf8c4828",
  measurementId: "G-XQHPEC26CH",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

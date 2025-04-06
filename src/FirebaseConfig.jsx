import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHrWt4pIjevq1s2zuaUGvb_kbNLCvktt8",
  authDomain: "project11-8ec22.firebaseapp.com",
  projectId: "project11-8ec22",
  storageBucket: "project11-8ec22.firebasestorage.app",
  messagingSenderId: "92927994155",
  appId: "1:92927994155:web:4f623fece8a7cf2d543d6e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

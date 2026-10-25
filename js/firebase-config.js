import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAiK9FgLh0gKO0mOsTyQNK-ysNA1BIKGIQ",
  authDomain: "dreambridge-ai.firebaseapp.com",
  projectId: "dreambridge-ai",
  storageBucket: "dreambridge-ai.firebasestorage.app",
  messagingSenderId: "888591056575",
  appId: "1:888591056575:web:5d8e15b9dfd520e920500a",
  measurementId: "G-9YX90BQLMS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("auth-form");
const signupFields = document.getElementById("signup-fields");
const submitBtn = document.getElementById("submit-btn");
const toggleLink = document.getElementById("toggle-link");
const errorEl = document.getElementById("error");

let isSignup = true;

toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isSignup = !isSignup;
  signupFields.style.display = isSignup ? "block" : "none";
  submitBtn.textContent = isSignup ? "Sign up" : "Log in";
  toggleLink.textContent = isSignup
    ? "Already have an account? Log in"
    : "New here? Sign up";
  errorEl.textContent = "";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.textContent = "";
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    let uid;
    if (isSignup) {
      const name = document.getElementById("name").value.trim();
      const role = document.getElementById("role").value;
      const familyCode = document.getElementById("family-code").value.trim().toUpperCase();
      if (!name || !familyCode) {
        errorEl.textContent = "Please fill in your name and family code.";
        return;
      }
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      uid = cred.user.uid;
      await setDoc(doc(db, "users", uid), { name, role, familyCode, email });
      goToRolePage(role);
        } else {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const snap = await getDoc(doc(db, "users", cred.user.uid));
      console.log("login ok, profile:", snap.exists(), snap.data());
      if (!snap.exists()) {
        errorEl.textContent = "Logged in, but no profile found in Firestore.";
        return;
      }
      goToRolePage(snap.data().role);
    }
  } catch (err) {
    errorEl.textContent = err.message;
  }
});

function goToRolePage(role) {
  window.location.href = role === "parent" ? "parent.html" : "child.html";
}
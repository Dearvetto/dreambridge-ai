import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export function requireRole(expectedRole, onReady) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }
    const snap = await getDoc(doc(db, "users", user.uid));
    const profile = snap.data();
    if (!profile || profile.role !== expectedRole) {
      window.location.href = "index.html";
      return;
    }
    onReady(user, profile);
  });
}

export function logout() {
  signOut(auth).then(() => (window.location.href = "index.html"));
}
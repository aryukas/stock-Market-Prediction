import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrHBMrz52fcr_tNhvgmqPILTrXPaokLOo",
  authDomain: "invoice-app-36f12.firebaseapp.com",
  projectId: "invoice-app-36f12",
  storageBucket: "invoice-app-36f12.firebasestorage.app",
  messagingSenderId: "346187161240",
  appId: "1:346187161240:web:355ea594e22198af43faed",
  measurementId: "G-YPVRR6TFVT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase initialized:", app.name);
console.log("Auth instance:", auth);

// Test signup
createUserWithEmailAndPassword(auth, "test@test.com", "test123")
  .then((userCredential) => {
    console.log("✅ Signup successful:", userCredential.user.email);
  })
  .catch((error) => {
    console.error("❌ Signup error:", error.code, error.message);
  });

function farmer()
{
    window.location.href="../login.html"
}

window.addEventListener("load", () => {
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries.length > 0 && navEntries[0].type === "reload") {
      // Only run this on reload
      location.hash = "#home";
    }
  });

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaQOphF1F_q6HmU5hmxZOgJqwub1AAlLg",
  authDomain: "farmer-username-login.firebaseapp.com",
  projectId: "farmer-username-login",
  storageBucket: "farmer-username-login.firebasestorage.app",
  messagingSenderId: "855276765141",
  appId: "1:855276765141:web:78f5776350798c8bf4875c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




function login(username, password) {
  auth.signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
    })
    .catch((error) => {
      console.error("Login error:", error.message);
    });
}

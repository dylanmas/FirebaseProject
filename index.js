import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCq9KAjaMUnEMz8gVd18bVWeK7hJmHjei0",
  authDomain: "project1-361fe.firebaseapp.com",
  projectId: "project1-361fe",
  storageBucket: "project1-361fe.appspot.com",
  messagingSenderId: "736147595585",
  appId: "1:736147595585:web:4d7763daa8bf5cd67881c0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const data = getDatabase(app);

document.getElementById("login").addEventListener("click", function () {
  var email = document.getElementById("eml");
  var password = document.getElementById("pwd");

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      location.href = "info.html";
      alert("Welcome, " + email.value + "!");
      window.sessionStorage.setItem("email", email.value);
      // ...
    })
    .catch((error) => {
      alert(error.message);
      // ..
    });
});

document.getElementById("signup").addEventListener("click", function () {
  var email1 = document.getElementById("eml");
  var password = document.getElementById("pwd");

  createUserWithEmailAndPassword(auth, email1.value, password.value)
  .then(() => {
    alert("Account creation successful!\nYou can sign in to your account now.");
  })
  .catch((error) => {
    alert(error.message);
  })

  tmp2 = email1.value.replace(".", "");
  firebase
    .database()
    .ref("account/" + tmp2)
    .set({
      email: email1.value,
    });
});
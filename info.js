//TODO use onAuthStateChanged to prevent unauthorized account access by changing local storage.

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  child,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

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

var name, email, sec, gen;

function fetchVal() {
  email = window.sessionStorage.getItem("email").replace(".", "");
  name = document.getElementById("name").value;
  sec = document.getElementById("sec").value;
  gen = document.getElementById("gnd").value;
}

function showinfo() {
  get(
    child(
      ref(data),
      `account/${window.sessionStorage.getItem("email").replace(".", "")}`
    )
  ).then((snapshot) => {
    if (snapshot.exists()) {
      document.getElementById("name").value = snapshot.val().Nameofaccount;
      document.getElementById("sec").value = snapshot.val().Section;
      document.getElementById("gnd").value = snapshot.val().Gender;
    }
  });
}

document.getElementById("signout").addEventListener("click", function () {
  signOut(auth)
    .catch((error) => {
      alert("You can't sign out.\nAn error occurred.");
    })
    .then(() => {
      alert("Signed out");
      window.sessionStorage.setItem("email", "");
      location.href = "index.html";
    });
});

document.getElementById("insert").addEventListener("click", function () {
  fetchVal();

  set(
    ref(
      data,
      "account/" + window.sessionStorage.getItem("email").replace(".", "")
    ),
    {
      Nameofaccount: name,
      email: email,
      Section: sec,
      Gender: gen,
    }
  );

  alert("Your data has been saved.");

  showinfo();
});

document.getElementById("select").addEventListener("click", function () {
  fetchVal();

  get(
    child(
      ref(data),
      `account/${window.sessionStorage.getItem("email").replace(".", "")}`
    )
  ).then((snapshot) => {
    if (snapshot.exists()) {
      document.getElementById("name").value = snapshot.val().Nameofaccount;
      document.getElementById("sec").value = snapshot.val().Section;
      document.getElementById("gnd").value = snapshot.val().Gender;
    }
  });
});

document.getElementById("update").addEventListener("click", function () {
  fetchVal();
  tmp2 = email.value.replace(".", "");
  database(data)
    .ref("account/" + tmp2)
    .update({
      Nameofaccount: name,
      Section: sec,
      Gender: gen,
    });
});

document.getElementById("delete").addEventListener("click", function () {
  update(
    ref(
      data,
      "account/" + window.sessionStorage.getItem("email").replace(".", "")
    ),
    {
      Nameofaccount: "Unknown",
      email: window.sessionStorage.getItem("email"),
      Section: "Unknown",
      Gender: "Unknown",
    }
  );

  alert("Wipe successful.");

  showinfo();
});

window.onload = function () {
  document.getElementById("emldisplay").value =
    window.sessionStorage.getItem("email");

  showinfo();
};

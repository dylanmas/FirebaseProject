import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCq9KAjaMUnEMz8gVd18bVWeK7hJmHjei0",
  authDomain: "project1-361fe.firebaseapp.com",
  projectId: "project1-361fe",
  storageBucket: "project1-361fe.appspot.com",
  messagingSenderId: "736147595585",
  appId: "1:736147595585:web:4d7763daa8bf5cd67881c0",
};
//
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const data = getDatabase(app);

var name, email, sec, gen;

function fetchVal() {
  email = document.getElementById("emldisplay").value;
  name = document.getElementById("name").value;
  sec = document.getElementById("sec").value;
  gen = document.getElementById("gnd").value;
}

document.getElementById("login").addEventListener("click", function() {
  var email = document.getElementById("eml");
  var password = document.getElementById("pwd");

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      location.href = "info.html";
      alert("Welcome, " + email.value + "!");
      tmp2 = "dylanmas687@gmail.com";
      window.sessionStorage.setItem("email", tmp2);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});

/*
function logIn() {
    email = document.getElementById("eml");
    var password = document.getElementById("pwd");
    const tmp = auth.signInWithEmailAndPassword(email.value, password.value);
    
    tmp.catch(e => {
        alert(e.message);
    });

    location.href = "info.html";
}*/

document.getElementById("signup").addEventListener("click", function () {
    var email1 = document.getElementById("eml");
    var password = document.getElementById("pwd");
    const tmp = createUserWithEmailAndPassword(auth, email1.value, password.value);

    tmp.catch((e) => alert(e.message));

    tmp2 = email1.value.replace(".", "");
    firebase
      .database()
      .ref("account/" + tmp2)
      .set({
        email: email1.value,
      });
})

document.getElementById("signout").addEventListener("click", function () {
    signOut(auth);
    alert("Signed out");
    location.href = "index.html";
    window.sessionStorage.setItem("email", "");
})

document.getElementById("insert").addEventListener('click', function () {
    fetchVal();
    tmp2 = email.value.replace(".", "");
    alert();
    database()
      .ref("account/" + tmp2)
      .set({
        Nameofaccount: name,
        email: email,
        Section: sec,
        Gender: gen,
      });
})

function insert() {
  
}

function select() {
  fetchVal();
  tmp2 = email.value.replace(".", "");
  database().ref("account/" + tmp2)
    .on("value", function (snapshot) {
      document.getElementById("name").value = snapshot.val().Nameofaccount;
      document.getElementById("sec").value = snapshot.val().Section;
      document.getElementById("gnd").value = snapshot.val().Gender;
    });
}

function update() {
  fetchVal();
  tmp2 = email.value.replace(".", "");
  database().ref("account/" + tmp2)
    .update({
      Nameofaccount: name,
      Section: sec,
      Gender: gen,
    });
}

function remove() {
  document.getElementById("delete").onclick = function () {
    fetchVal();
    database().ref("account/" + email)
      .remove();
  };
}

function autofill() {
  tmp = window.sessionStorage.getItem("email");
  document.getElementById("emldisplay").value = tmp;

  tmp2 = tmp.replace(".", "");

  database().ref("account/" + tmp2)
    .on("value", function (snapshot) {
      document.getElementById("name").value = snapshot.val().Nameofaccount;
      document.getElementById("sec").value = snapshot.val().Section;
      document.getElementById("gnd").value = snapshot.val().Gender;
    });
}

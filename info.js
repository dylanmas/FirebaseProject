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

var name, email, sec, gen;

function fetchVal() {
  email = document.getElementById("emldisplay").value;
  name = document.getElementById("name").value;
  sec = document.getElementById("sec").value;
  gen = document.getElementById("gnd").value;
}

document.getElementById("signout").addEventListener("click", function () {
  signOut(auth);
  alert("Signed out");
  window.sessionStorage.setItem("email", "");
  location.href = "index.html";
});

document.getElementById("insert").addEventListener("click", function () {
  alert("click");
  fetchVal();
  tmp2 = email.value.replace(".", "");
  alert();
  database(data)
    .ref("account/" + tmp2)
    .set({
      Nameofaccount: name,
      email: email,
      Section: sec,
      Gender: gen,
    });
});

document.getElementById("select").addEventListener("click", function () {
  fetchVal();
  tmp2 = email.value.replace(".", "");
  database(data)
    .ref("account/" + tmp2)
    .on("value", function (snapshot) {
      document.getElementById("name").value = snapshot.val().Nameofaccount;
      document.getElementById("sec").value = snapshot.val().Section;
      document.getElementById("gnd").value = snapshot.val().Gender;
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
  document.getElementById("delete").onclick = function () {
    fetchVal();
    database(data)
      .ref("account/" + email)
      .remove();
  };
});

//TODO fix this function!
document.body.onload = function () {
  tmp = window.sessionStorage.getItem("email");
  alert(tmp + "ja bitte!");
  // document.getElementById("emldisplay").value = tmp;

  // tmp2 = tmp.replace(".", "");

  // database(data)
  //   .ref("account/" + tmp2)
  //   .on("value", function (snapshot) {
  //     document.getElementById("name").value = snapshot.val().Nameofaccount;
  //     document.getElementById("sec").value = snapshot.val().Section;
  //     document.getElementById("gnd").value = snapshot.val().Gender;
  //   });
};

// email default : admin@gmail.com || password default : Admin123@gmail.com //

// deklarasi variabel endpoint API
const API = "https://6423f83a47401740432fbc9e.mockapi.io/users/";

//fungsi mengirim email dan password ke API untuk nanti digunakan sebagai informasi login.
function sendUserData() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      console.log(users);
    });
}

// fungsi register user
function registerUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch(API)
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      const sameEmail = users.find((e) => e.email === email);
      if (!email) {
        alert("Please enter your email address");
        console.log(email);
      } else if (!password) {
        alert("Please enter your password");
      } else if (sameEmail !== undefined) {
        alert("Email already registered");
      } else {
        sendUserData();
        alert("success!");
        window.location.href = "index.html";
      }
    });
}

//fungsi login user
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(API)
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      const sameEmailPassword = users.find(
        (e) => e.email === email && e.password === password
      );
      if (!email) {
        alert("Please enter your email address");
        console.log(email);
      } else if (!password) {
        alert("Please enter your password");
      } else if (sameEmailPassword === undefined) {
        alert("Please register your email and password first");
      } else if (sameEmailPassword !== undefined) {
        alert("success!");
        window.location.href = "homepage.html";
      }
    });
}

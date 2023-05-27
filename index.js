window.onload = function () {
  if (localStorage.getItem("access-token") != null) {
    window.location.href = "./profile.html";
  }
};
let signUpButton = document.getElementById("signup");
let form = document.getElementsByTagName("form");
let message = document.getElementById("error-success");
let profile = document.getElementById("profileLink");

// Helper function to generate a random access token
function generateAccessToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 16;
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}

function signUp() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (name == "" || email == "" || password == "" || confirmPassword == "") {
    message.style.color = "red";
    message.textContent = "Error : All the fields are mandatory";
  } else if (password != confirmPassword) {
    message.style.color = "red";
    message.textContent = "Error : Password do not match";
  } else {
    message.style.color = "green";
    message.innerHTML = "Successfully signed up!";
    const user = {
      fullName: name,
      email: email,
      password: password,
    };
    localStorage.setItem("userState", JSON.stringify(user));

    let access_token = generateAccessToken();
    localStorage.setItem("access-token", access_token);

    setTimeout(function () {
      window.location.href = "./profile.html";
    }, 800);
  }

  form[0].reset();
}

function toProfile(e) {
  if (localStorage.getItem("access-token") != null) {
    window.location.href = "./profile.html";
  } else {
    e.preventDefault();
  }
}
signUpButton.addEventListener("click", signUp);
profile.addEventListener("click", toProfile);

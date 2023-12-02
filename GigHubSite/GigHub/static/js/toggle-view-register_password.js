function togglePasswordVisibility(inputId, eyeIconId) {
  var passwordInput = document.getElementById(inputId);
  var eyeIcon = document.getElementById(eyeIconId);

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.setAttribute("icon", "fluent:eye-16-filled");
  } else {
    passwordInput.type = "password";
    eyeIcon.setAttribute("icon", "fluent:eye-off-16-filled");
  }
}

document.getElementById("password-eye").addEventListener("click", function () {
  togglePasswordVisibility("password", "password-eye");
});

document.getElementById("cpassword-eye").addEventListener("click", function () {
  togglePasswordVisibility("cpassword", "cpassword-eye");
});

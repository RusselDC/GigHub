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
  
  document
    .getElementById("new-password-eye")
    .addEventListener("click", function () {
      togglePasswordVisibility("new-password", "new-password-eye");
    });
  
  document
    .getElementById("confirm-password-eye")
    .addEventListener("click", function () {
      togglePasswordVisibility("confirm-password", "confirm-password-eye");
    });
  
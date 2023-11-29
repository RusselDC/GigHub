$(document).ready(function () {
  function checkAndUpdateClasses() {
    var emailValue = $("#email").val();
    var passwordValue = $("#password").val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      $(".empty-email").addClass("active").text("Email address cannot be blank.");
      $("#email").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else if (!emailRegex.test(emailValue)) {
      $(".empty-email").addClass("active").text("Please enter a valid email.");
      $("#email").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".empty-email").removeClass("active");
      $("#email").css({
        "border-color": "",
        animation: "",
      });
    }

    if (passwordValue === "") {
      $(".empty-pass").addClass("active");
      $(".pass-input").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".empty-pass").removeClass("active");
      $(".pass-input").css({
        "border-color": "",
        animation: "",
      });
    }
  }

  $("form .submit-form").on("click", function () {
    checkAndUpdateClasses();
  });

  $("#email, #password").on("keyup", function () {
    checkAndUpdateClasses();
  });
});

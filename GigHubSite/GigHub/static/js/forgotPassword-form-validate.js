$(document).ready(function () {
  function checkAndUpdateClasses() {
    var emailValue = $("#email").val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      $(".empty-email")
        .addClass("active")
        .text("Email address cannot be blank.");
      $(".email-input").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else if (!emailRegex.test(emailValue)) {
      $(".empty-email").addClass("active").text("Please enter a valid email.");
      $(".email-input").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".empty-email").removeClass("active");
      $(".email-input").css({
        "border-color": "",
        animation: "",
      });
    }
  }

  $("form .submit-form").on("click", function () {
    checkAndUpdateClasses();
  });

  $("#email").on("keyup", function () {
    checkAndUpdateClasses();
  });
});

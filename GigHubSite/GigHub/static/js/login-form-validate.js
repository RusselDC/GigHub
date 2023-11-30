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
  $("#email, #password").on("keyup", function () {
    checkAndUpdateClasses();
  });
});



function checkAndUpdateClasses() {
  var emailValue = $("#email").val();
  var passwordValue = $("#password").val();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var isValid = true;

  if (emailValue === "") {
    $(".empty-email").addClass("active").text("Email address cannot be blank.");
    $("#email").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    $(".empty-email").addClass("active").text("Please enter a valid email.");
    $("#email").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
    isValid = false
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
    isValid = false;
  } else {
    $(".empty-pass").removeClass("active");
    $(".pass-input").css({
      "border-color": "",
      animation: "",
    });
  }

  return isValid;
}
function validateLogin()
  {
    let isValid = checkAndUpdateClasses();
    if(isValid)
    {
      document.getElementById('loginForm').submit()
    }
  }
function togglePassword(element, val, type)
{
  element.style.display = "none";
  document.getElementById(val).style.display = "block"
  document.getElementById('password').type = type
}
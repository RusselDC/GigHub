$(document).ready(function () {
  function checkAndUpdateClasses() {
    var lname = $("#lastname").val();
    var fname = $("#firstname").val();
    var minitial = $("#minitial").val();
    var mobile = $("#mobile").val();
    var email = $("#email").val();
    var pass = $("#password").val();
    var cpass = $("#cpassword").val();

    if (lname === "") {
      $(".lname_msg").addClass("active");
      $("#lastname").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".lname_msg").removeClass("active");
      $("#lastname").css({
        "border-color": "",
        animation: "",
      });
    }

    if (fname === "") {
      $(".fname_msg").addClass("active");
      $("#firstname").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".fname_msg").removeClass("active");
      $("#firstname").css({
        "border-color": "",
        animation: "",
      });
    }

    if (minitial === "") {
      $(".minitial_msg").addClass("active");
      $("#minitial").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".minitial_msg").removeClass("active");
      $("#minitial").css({
        "border-color": "",
        animation: "",
      });
    }

    if (mobile === "") {
      $(".mnum_msg").addClass("active");
      $("#mobile").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".mnum_msg").removeClass("active");
      $("#mobile").css({
        "border-color": "",
        animation: "",
      });
    }

    if (email === "") {
      $(".email_msg").addClass("active");
      $("#email").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".email_msg").removeClass("active");
      $("#email").css({
        "border-color": "",
        animation: "",
      });
    }

    if (pass === "") {
      $(".pass_msg").addClass("active");
      $(".pass-input.pass").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".pass_msg").removeClass("active");
      $(".pass-input.pass").css({
        "border-color": "",
        animation: "",
      });
    }

    if (cpass === "") {
      $(".cpass_msg").addClass("active");
      $(".pass-input.cpass").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".cpass_msg").removeClass("active");
      $(".pass-input.cpass").css({
        "border-color": "",
        animation: "",
      });
    }
  }

  $("form .submit-form").on("click", function () {
    checkAndUpdateClasses();
  });

  $(
    "#lastname, #firstname, #minitial, #mobile, #email, #password, #cpassword"
  ).on("keyup", function () {
    checkAndUpdateClasses();
  });
});

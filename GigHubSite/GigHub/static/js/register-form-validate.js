document.getElementById("profile_picture").addEventListener("change", (e) => {
  let previewImg = document.getElementById("previewImg");
  const defaultImg = previewImg.src;
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    previewImg.src = defaultImg;
  }
});

function validate() {
  var lname = $("#lastname").val();
  var fname = $("#firstname").val();
  var minitial = $("#minitial").val();
  var mobile = $("#mobile").val();
  var email = $("#email").val();
  var pass = $("#password").val();
  var cpass = $("#cpassword").val();
  var rolePicker = $("#rolePicker");
  var sex = $("#sex");
  var bdate = $("#bdate");

  if (bdate.val() === "") {
    $(".bdate_msg").addClass("active");
    bdate.css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else {
    $(".bdate_msg").removeClass("active");
    bdate.css({
      "border-color": "",
      animation: "",
    });
  }

  if (sex.find(":selected").is(":disabled")) {
    $(".sex_msg").addClass("active");
    sex.css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else {
    $(".sex_msg").removeClass("active");
    sex.css({
      "border-color": "",
      animation: "",
    });
  }

  if (rolePicker.find(":selected").is(":disabled")) {
    $(".role_msg").addClass("active");
    rolePicker.css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else {
    $(".role_msg").removeClass("active");
    rolePicker.css({
      "border-color": "",
      animation: "",
    });
  }

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
    $(".cpass_msg")
      .text("Confirm password cannot be empty.")
      .addClass("active");
    $(".pass-input.cpass").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else if (pass !== cpass) {
    $(".cpass_msg").text("Passwords do not match.").addClass("active");
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

  // alert(isValid);
  // if (isValid) {
  //   const form = document.getElementById("regForm");
  //   Swal.fire({
  //     title: "Are you sure with the details inserted?",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       form.submit();
  //     }
  //   });
  // }

  const elements = [
    ".lname_msg",
    ".fname_msg",
    ".minitial_msg",
    ".mnum_msg",
    ".email_msg",
    ".pass_msg",
    ".cpass_msg",
    ".bdate_msg",
    ".role_msg",
    ".sex_msg",
  ];

  const allElementsInactive = elements.every(
    (element) => !document.querySelector(element).classList.contains("active")
  );

  if (allElementsInactive) {
    const form = document.getElementById("regForm");
    Swal.fire({
      title: "Are you sure with the details inserted?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        form.submit();
      }
    });
  }
}

$(document).ready(function () {
  $("#rolePicker, #sex, #bdate").on("change", function () {
    validate();
  });

  $(
    "#lastname, #firstname, #minitial, #mobile, #email, #password, #cpassword"
  ).on("keyup", function () {
    validate();
  });
});

function validateBday() {
  var birthdateInput = document.getElementById("bdate");
  var birthdate = new Date(birthdateInput.value);

  // Calculate the age
  var currentDate = new Date();
  var age = currentDate.getFullYear() - birthdate.getFullYear();

  // Check if the user is 18 years or older
  if (age < 18) {
    Swal.fire({
      icon: "error",
      title: "Invalid Date",
      // text: "We only accept users 18 years or older",
      text: "Please enter a valid birthdate. Users must be 18 years or older to use this service.", // pinalitan ko para mas formal sound
    });
    $("#bdate").val("");
  }
}

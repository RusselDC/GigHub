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

$(document).ready(function () {
  $("#lastname").on("keyup", function () {
    if ($(this).val() === "") {
      $(".lname_msg").text("Last name cannot be empty.").addClass("active");
      $(this).css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".lname_msg").removeClass("active");
      $(this).css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#firstname").on("keyup", function () {
    if ($(this).val() === "") {
      $(".fname_msg").text("First name cannot be empty.").addClass("active");
      $(this).css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".fname_msg").removeClass("active");
      $(this).css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#minitial").on("keyup", function () {
    if ($(this).val() === "") {
      $(".minitial_msg")
        .text("Middle initial cannot be empty.")
        .addClass("active");
      $(this).css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".minitial_msg").removeClass("active");
      $(this).css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#mobile").on("keyup", function () {
    if ($(this).val() === "") {
      $(".mnum_msg").text("Mobile number cannot be empty.").addClass("active");
      $(this).css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".mnum_msg").removeClass("active");
      $(this).css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#email").on("keyup", function () {
    if ($(this).val() === "") {
      $(".email_msg").text("Email cannot be empty.").addClass("active");
      $(this).css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else if (!isValidEmail($(this).val())) {
      $(".email_msg").text("Invalid email address").addClass("active");
      $(this).css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".email_msg").removeClass("active");
      $(this).css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#password").on("keyup", function () {
    var pass = $(this).val();
    var passMsg = $(".pass_msg");

    if (pass === "") {
      passMsg.text("Password cannot be empty.").addClass("active");
      $(".pass-input.pass").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else if (pass.length < 8) {
      passMsg.text("Password too short.").addClass("active");
      $(".pass-input.pass").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else if (!hasNumericDigit(pass)) {
      passMsg
        .text("Password must include at least one numeric digit.")
        .addClass("active");
      $(".pass-input.pass").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else if (!hasSpecialCharacter(pass)) {
      passMsg
        .text("Password must include at least one special character")
        .addClass("active");
      $(".pass-input.pass").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      passMsg.removeClass("active");
      $(".pass-input.pass").css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#cpassword").on("keyup", function () {
    var cpass = $(this).val();
    var cpassMsg = $(".cpass_msg");

    if (cpass === "") {
      cpassMsg.text("Confirm password cannot be empty.").addClass("active");
      $(".pass-input.cpass").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else if (cpass.length < 8) {
      cpassMsg.text("Password too short.").addClass("active");
      $(".pass-input.cpass").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else if (!hasNumericDigit(cpass)) {
      cpassMsg
        .text("Password must include at least one numeric digit.")
        .addClass("active");
      $(".pass-input.cpass").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else if (!hasSpecialCharacter(cpass)) {
      cpassMsg
        .text("Password must include at least one special character")
        .addClass("active");
      $(".pass-input.cpass").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else if ($("#password").val() !== cpass) {
      cpassMsg.text("Passwords do not match.").addClass("active");
      $(".pass-input.cpass").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      cpassMsg.removeClass("active");
      $(".pass-input.cpass").css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#bdate").on("keyup", function () {
    if ($(this).val() === "") {
      $(".bdate_msg").text("Date of birth cannot be empty.").addClass("active");
      $(this).css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".bdate_msg").removeClass("active");
      $(this).css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#rolePicker").on("change", function () {
    if ($(this).find(":selected").is(":disabled")) {
      $(".role_msg").text("Please select a role.").addClass("active");
      $(this).css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".role_msg").removeClass("active");
      $(this).css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#sex").on("change", function () {
    if ($(this).find(":selected").is(":disabled")) {
      $(".sex_msg").text("Please select a gender.").addClass("active");
      $(this).css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".sex_msg").removeClass("active");
      $(this).css({
        "border-color": "",
        animation: "",
      });
    }
  });
});


function validate() {
  var lname = $("#lastname").val();
  var fname = $("#firstname").val();
  var minitial = $("#minitial").val();
  var mobile = $("#mobile").val();
  var email = $("#email").val();
  var pass = $("#password").val();
  var cpass = $("#cpassword").val();
  var check = document.getElementById('iagree');
  var rolePicker = $("#rolePicker");
  var sex = $("#sex");
  var isValid = true;
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
  } else if (!isValidEmail(email)) {
    $(".email_msg").text("Invalid email address").addClass("active");
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
  } else if (pass.length < 8) {
    $(".pass_msg").text("Password too short.").addClass("active");
    $(".pass-input.pass").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else if (!hasNumericDigit(pass)) {
    $(".pass_msg")
      .text("Password must include at least one numeric digit.")
      .addClass("active");
    $(".pass-input.pass").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else if (!hasSpecialCharacter(pass)) {
    $(".pass_msg")
      .text("Password must include at least one special character")
      .addClass("active");
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
  } else if (cpass.length < 8) {
    $(".cpass_msg").text("Password too short.").addClass("active");
    $(".pass-input.cpass").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else if (!hasNumericDigit(cpass)) {
    $(".cpass_msg")
      .text("Password must include at least one numeric digit.")
      .addClass("active");
    $(".pass-input.cpass").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else if (!hasSpecialCharacter(cpass)) {
    $(".cpass_msg")
      .text("Password must include at least one special character")
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

  if(!check.checked)
  {
    Swal.fire({
      icon: "error",
      text: "Please read the terms of service!",
    });
    isValid = false;
  }

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


function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
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
function hasNumericDigit(str) {
  // Check if the string contains at least one numeric digit
  return /\d/.test(str);
}

function hasSpecialCharacter(str) {
  // Check if the string contains at least one special character
  const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  return specialCharacterRegex.test(str);
}

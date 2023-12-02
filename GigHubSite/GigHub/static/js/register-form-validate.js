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

 

  $(
    "#lastname, #firstname, #minitial, #mobile, #email, #password, #cpassword"
  ).on("keyup", function () {
    checkAndUpdateClasses();
  });
});

document.getElementById('profile_picture').addEventListener('change',(e)=>{
  let previewImg = document.getElementById('previewImg')
  const defaultImg = previewImg.src;
  const file = e.target.files[0];
  if(file)
  {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
    };
    reader.readAsDataURL(file);

  }else{
    previewImg.src = defaultImg
  }
})

function validate()
{
  let isValid = true;
  var lname = $("#lastname").val();
  var fname = $("#firstname").val();
  var minitial = $("#minitial").val();
  var mobile = $("#mobile").val();
  var email = $("#email").val();
  var pass = $("#password").val();
  var cpass = $("#cpassword").val();
  var check = document.getElementById('iagree');
  var role = document.getElementById('rolePicker');

  

  if (lname === "") {
    $(".lname_msg").addClass("active");
    $("#lastname").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
    isValid = false;
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
    isValid = false;
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
    isValid = false;
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
    isValid = false;
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
    isValid = false;
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
    isValid = false;
  } else {
    $(".pass_msg").removeClass("active");
    $(".pass-input.pass").css({
      "border-color": "",
      animation: "",
    });
  }

  if (cpass === "") {
    $(".cpass_msg").addClass("active");
    $(".cpass_msg").text("Confirm Password Cannot Be Empty")
    $(".pass-input.cpass").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
    isValid = false;
  } else {
    if(pass !== cpass)
    {
      $(".cpass_msg").addClass("active");
      $(".cpass_msg").text("passwords aren't similar")
      $(".pass-input.cpass").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
    isValid = false;
    }
  }

  if(!check.checked)
  {
    Swal.fire({
      icon: "error",
      text: "Please read and click the terms and conditions!",
    });
    isValid = false;
  }

  if(role.value === "")
  {
    $(".role_msg").addClass("active");
    $(".role_msg").text("Please select a role")
    isValid = false;
  }
  alert(isValid);
  
  if(isValid)
  {
    const form = document.getElementById('regForm');
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

function validateBday()
{
  var birthdateInput = document.getElementById('bdate');
    var birthdate = new Date(birthdateInput.value);

    // Calculate the age
    var currentDate = new Date();
    var age = currentDate.getFullYear() - birthdate.getFullYear();

    // Check if the user is 18 years or older
    if (age < 18) {
        Swal.fire({
          icon: "error",
          title: "Invalid Date",
          text: "We only accepts users 18 years older",
        });
    }
}
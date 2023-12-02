function validate() {
  var hloed = $("#hloed").val();
  var inst_att = $("#inst_att").val();
  var course = $("#course").val();
  var specialization = $("#specialization").val();
  var gradDate = $("#gradDate").val();

  if (gradDate === "" || isNaN(Date.parse(gradDate))) {
    $(".gradDate_msg").addClass("active");
    $("#gradDate").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else {
    $(".gradDate_msg").removeClass("active");
    $("#gradDate").css({
      "border-color": "",
      animation: "",
    });
  }

  if (specialization === "") {
    $(".specialization_msg").addClass("active");
    $("#specialization").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else {
    $(".specialization_msg").removeClass("active");
    $("#specialization").css({
      "border-color": "",
      animation: "",
    });
  }

  if (course === "") {
    $(".course_msg").addClass("active");
    $("#course").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else {
    $(".course_msg").removeClass("active");
    $("#course").css({
      "border-color": "",
      animation: "",
    });
  }

  if (inst_att === "") {
    $(".inst_att_msg").addClass("active");
    $("#inst_att").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else {
    $(".inst_att_msg").removeClass("active");
    $("#inst_att").css({
      "border-color": "",
      animation: "",
    });
  }

  if (hloed === "") {
    $(".hloed_msg").addClass("active");
    $("#hloed").css({
      "border-color": "var(--red)",
      animation: "shake 0.5s",
    });
  } else {
    $(".hloed_msg").removeClass("active");
    $("#hloed").css({
      "border-color": "",
      animation: "",
    });
  }

  const elements = [
    ".hloed_msg",
    ".inst_att_msg",
    ".course_msg",
    ".specialization_msg",
    ".gradDate_msg",
  ];

  const allElementsInactive = elements.every(
    (element) => !document.querySelector(element).classList.contains("active")
  );

  if (allElementsInactive) {
    const form = document.getElementById("regForm");
    Swal.fire({
      title: "Confirm Details",
      text: "Are you sure all details are correct?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // form.submit();
      }
    });
  }
}

$(document).ready(function () {
  $("#hloed").on("keyup", function () {
    var hloed = $("#hloed").val();

    if (hloed === "") {
      $(".hloed_msg").addClass("active");
      $("#hloed").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".hloed_msg").removeClass("active");
      $("#hloed").css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#inst_att").on("keyup", function () {
    var inst_att = $("#inst_att").val();

    if (inst_att === "") {
      $(".inst_att_msg").addClass("active");
      $("#inst_att").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".inst_att_msg").removeClass("active");
      $("#inst_att").css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#course").on("keyup", function () {
    var course = $("#course").val();

    if (course === "") {
      $(".course_msg").addClass("active");
      $("#course").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".course_msg").removeClass("active");
      $("#course").css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#specialization").on("keyup", function () {
    var specialization = $("#specialization").val();

    if (specialization === "") {
      $(".specialization_msg").addClass("active");
      $("#specialization").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".specialization_msg").removeClass("active");
      $("#specialization").css({
        "border-color": "",
        animation: "",
      });
    }
  });

  $("#gradDate").on("change", function () {
    var gradDate = $("#gradDate").val();

    if (gradDate === "" || isNaN(Date.parse(gradDate))) {
      $(".gradDate_msg").addClass("active");
      $("#gradDate").css({
        "border-color": "var(--red)",
        animation: "shake 0.5s",
      });
    } else {
      $(".gradDate_msg").removeClass("active");
      $("#gradDate").css({
        "border-color": "",
        animation: "",
      });
    }
  });
});

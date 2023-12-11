// save job
$(".job_actions iconify-icon").click(function () {
  $(this).closest(".job").toggleClass("saved");
});

// view job
$(".view_job").click(function () {
  $(this).closest(".job_container").toggleClass("modal_show");
});

// change job btn txt on modal view
$(".view_job").click(function () {
  let id = $(this).attr("data-id");
  alert(id);
  var jobContainer = $(this).closest(".job_container");
  if (jobContainer.hasClass("modal_show")) {
    $(this).html("<iconify-icon icon='ic:round-close'></iconify-icon>");
    $(".apply_btn").bind("click", () => {
      //applyJob(id)
    });
    $(".view_jobdetails").addClass("currTab");
  } else {
    $(this).html("MORE");

    $(".view_msg").removeClass("currTab");
    $(".msg").css("display", "none");
    $(".job_main").css("display", "block");
    $(".job_details").css("display", "block");
    $(".apply_btn").css("display", "none");
    $(".job_unsaved").css("position", "static");
    $(".job_saved").css("position", "static");
  }
});
$(document).ready(function () {
  $(".view_jobdetails").addClass("currTab");
  $(".msg").css("display", "none");

  $(".view_msg").click(function () {
    $(".tabJob").removeClass("currTab");
    $(".view_msg").addClass("currTab");
    $(this).addClass("currTab");

    $(".msg").css("display", "flex");
    $(".job_main").css("display", "none");
    $(".job_details").css("display", "none");
    $(".apply_btn").css("display", "none");
    $(".job_saved").css("position", "absolute");
    $(".job_saved").css("left", "100vw");
    $(".job_unsaved").css("position", "absolute");
    $(".job_unsaved").css("left", "100vw");
  });

  $(".view_jobdetails").click(function () {
    $(".tabJob").removeClass("currTab");
    $(".view_msg").removeClass("currTab");
    $(this).addClass("currTab");

    $(".msg").css("display", "none");
    $(".job_main").css("display", "block");
    $(".job_details").css("display", "block");
    $(".apply_btn").css("display", "block");
    $(".job_unsaved").css("position", "static");
    $(".job_saved").css("position", "static");
  });
});

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
  var jobContainer = $(this).closest(".job_container");
  if (jobContainer.hasClass("modal_show")) {
    $(this).html("<iconify-icon icon='ic:round-close'></iconify-icon>");
  } else {
    $(this).html("MORE");
  }
});

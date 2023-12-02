$(document).ready(function () {
  $(".submit-form").on("click", function () {
    var skillsContainer = $("#skills");
    var tags = skillsContainer.find(".tags");

    if (tags.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "At least one skill is required!",
      });
    } else {
      // duh
    }
  });
});

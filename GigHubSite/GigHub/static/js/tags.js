$(document).ready(function () {
  $(".tags").on("click", function () {
    if ($(this).parent().hasClass("tags_list")) {
      $(this).appendTo("#skills");
    } else {
      $(this).appendTo(".tags_list");
    }

    // Check if there are zero tags inside .tags_list
    if ($(".tags_list").children(".tags").length === 0) {
      $("#suggestedSkills").css("display", "none");
    } else {
      $("#suggestedSkills").css("display", "flex");
    }
  });

  $("#createTagBtn").on("click", function () {
    var newSkill = $("#newTagInput").val().trim();

    if (newSkill !== "") {
      var newTag = $("<div>", {
        class: "tags rounded-pill py-1 px-3",
        text: newSkill,
        append: $("<span>").html(
          '<iconify-icon icon="iconamoon:close-bold"></iconify-icon>'
        ),
        click: function () {
          if ($(this).parent().hasClass("tags_list")) {
            $(this).appendTo("#skills");
          } else {
            $(this).appendTo(".tags_list");
          }
          if ($(".tags_list").children(".tags").length === 0) {
            $("#suggestedSkills").css("display", "none");
          } else {
            $("#suggestedSkills").css("display", "flex");
          }
        },
      });

      newTag.appendTo("#skills");

      // Clear the input field
      $("#newTagInput").val("");
    }
  });
});

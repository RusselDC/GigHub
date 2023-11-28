$(document).ready(function () {
    $(".service-slide-2").addClass("hide-slide");
  
    $("#show-service-slide-1").on("click", function () {
      $("services .service-slide-1").addClass("hide-slide");
      $("services .service-slide-2").removeClass("hide-slide");
    });
  
    $("#show-service-slide-2").on("click", function () {
      $("services .service-slide-2").addClass("hide-slide");
      $("services .service-slide-1").removeClass("hide-slide");
    });
  });
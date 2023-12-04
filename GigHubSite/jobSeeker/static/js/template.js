$(document).ready(function () {
  if ($(window).width() <= 800) {
    $("sidebar").toggleClass("collapsed");
    $(".tabs span").toggleClass("collapsed");
    $("content").toggleClass("expand");
    $("header").toggleClass("expand");
  }
  $(".burger").click(function () {
    $("sidebar").toggleClass("collapsed");
    $(".tabs span").toggleClass("collapsed");
    $("content").toggleClass("expand");
    $("header").toggleClass("expand");
  });
});

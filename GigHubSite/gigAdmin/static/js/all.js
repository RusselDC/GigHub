const gridContainer = document.getElementById("bodyContainer");
const links = document.querySelectorAll(".links");
let isWide = true;

function toggleSidebar(element) {
  var rotate = element.style.transform;
  if (rotate === "") {
    element.style.transform = "rotate(180deg)";
  } else {
    element.style.transform = "";
  }
  isWide = !isWide;
  const newWidth = isWide ? "18vw 3fr" : "7vw 3fr";
  const minimize = isWide ? "flex" : "none";
  gridContainer.style.gridTemplateColumns = newWidth;

  links.forEach((link) => {
    link.style.display = minimize;
  });

  hiddenIMG = document.querySelector("#hiddenIMG");
  var display = hiddenIMG.style.display;
  if (display !== "none") {
    hiddenIMG.style.display = "none";
  } else {
    hiddenIMG.style.display = "flex";
  }
}

function showNotifications() {
  notifContainer = document.querySelector(".notifContainer");
  var display = notifContainer.style.display;
  if (display === "none" || display === "") {
    notifContainer.style.display = "block";
  } else {
    notifContainer.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const customSelect = document.querySelector(".custom-select");
  const selectedOption = customSelect.querySelector(".selected-option");
  const optionsList = customSelect.querySelector(".options-list");

  selectedOption.addEventListener("click", function () {
    optionsList.style.display =
      optionsList.style.display === "none" ? "block" : "none";
  });

  optionsList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const selectedValue = event.target.getAttribute("data-value");
      const iconHTML = `<iconify-icon icon="mingcute:down-fill"></iconify-icon>`;
      selectedOption.innerHTML = `${event.target.textContent} ${iconHTML}`;
      $(".status_msg").removeClass("active");
      $(".custom-select").css({
        "border-color": "",
        animation: "",
      });
      optionsList.style.display = "none";
    }
  });
});

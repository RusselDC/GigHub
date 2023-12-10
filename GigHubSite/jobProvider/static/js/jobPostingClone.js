function AcceptApplicant(id) {
    Swal.fire({
      title: "Accept Applicant",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Applicant Accepted",
          icon: "success",
          showConfirmButton: false,
        });
      }
    });
  }
  
  function RejectApplicant(id) {
    Swal.fire({
      title: "Reject Applicant",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Applicant Rejected",
          icon: "success",
          showConfirmButton: false,
        });
      }
    });
  }
  
  const formTitles = document.querySelectorAll(".options"),
    formContent = document.querySelectorAll(".container");
  
  formTitles.forEach((forms, index) => {
    forms.addEventListener("click", () => {
      formContent.forEach((content) => {
        content.classList.remove("active");
      });
  
      formTitles.forEach((content) => {
        content.classList.remove("active");
      });
  
      formTitles[index].classList.add("active");
      formContent[index].classList.add("active");
    });
  });
  function autoResizeTextarea(textarea) {
    if (textarea.value == "") {
      textarea.style.height = "";
    } else {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }
  
  function ValidateReply(input, form) {
    isValid = true;
    if (input.value == "") {
      isValid = false;
      input.style.borderColor = "var(--red)";
    }
    if (isValid) {
      form.submit();
    }
  }
  const textarea = document.querySelectorAll("textarea");
  textarea.forEach((input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "";
    });
  });
  
  function ViewDetails(div,id) {
    
    div.style.display = "flex";
  }
  
  function HideModal(event, el) {
    var modal = document.getElementById("detailsContainer");
  
    if (event.target !== modal && !modal.contains(event.target)) {
      el.style.display = "none";
    }
  }
  
  function BackButton() {
    window.location.href = "/Admin/Job1.html";
  }
  
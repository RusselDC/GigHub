
function Listeners() {
  const formTitles = document.querySelectorAll(".formTitles"),
    formContent = document.querySelectorAll(".formContent");

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
}

function showValue(selectElement, input) {
  var selectedText = selectElement.options[selectElement.selectedIndex].text;
  input.value = selectedText;
  selectElement.style.borderColor = "";
  RemoveError(selectElement);
}
const lettersOnlyRegex = /^[a-zA-Z\s]+$/;
const numbersOnlyRegex = /^[0-9]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const digitRegex = /\d/;
function Validate() {
  var profileImg = document.querySelector("#profileImg"),
    fName = document.querySelector("#fName"),
    mName = document.querySelector("#mName"),
    lName = document.querySelector("#lName"),
    suffix = document.querySelector("#suffix"),
    birthday = document.querySelector("#birthday"),
    age = document.querySelector("#age"),
    sex = document.querySelector("#sex"),
    number = document.querySelector("#number"),
    status = document.querySelector("#status"),
    // email = document.querySelector("#email"),
    province = document.querySelector("#province"),
    city = document.querySelector("#city"),
    barangay = document.querySelector("#barangay"),
    provinceInput = document.querySelector("#provinceInput"),
    cityInput = document.querySelector("#cityInput"),
    barangayInput = document.querySelector("#barangayInput"),
    isValid = true;

  var fNameValue = fName.value.trim(),
    mNameValue = mName.value.trim(),
    lNameValue = lName.value.trim(),
    suffixValue = suffix.value.trim(),
    sexValue = sex.value.trim(),
    numberValue = number.value.trim(),
    statusValue = status.value.trim();

  if (fNameValue == "") {
    ShowError(fName, "Field required");
    isValid = false;
  } else if (!lettersOnlyRegex.test(fNameValue)) {
    ShowError(fName, "Invalid Format");
    isValid = false;
  } else {
    RemoveError(fName);
  }

  if (mNameValue == "") {
    RemoveError(mName);
  } else if (!lettersOnlyRegex.test(mNameValue)) {
    ShowError(mName, "Invalid Format");
    isValid = false;
  } else {
    RemoveError(mName);
  }

  if (lNameValue == "") {
    ShowError(lName, "Field required");
    isValid = false;
  } else if (!lettersOnlyRegex.test(lNameValue)) {
    ShowError(lName, "Invalid Format");
    isValid = false;
  } else {
    RemoveError(lName);
  }

  if (suffixValue == "") {
    RemoveError(suffix);
  } else if (!lettersOnlyRegex.test(suffixValue)) {
    ShowError(suffix, "Invalid Format");
    isValid = false;
  } else {
    RemoveError(suffix);
  }

  if (birthday.value == "") {
    ShowError(birthday, "Field required");
    isValid = false;
  } else {
    RemoveError(birthday);
  }

  if (age.value == 0) {
    ShowError(age, "Field required");
    isValid = false;
  } else {
    RemoveError(age);
  }

  if (sexValue == "") {
    ShowError(sex, "Field required");
    isValid = false;
  } else if (!lettersOnlyRegex.test(sexValue)) {
    ShowError(sex, "Invalid Format");
    isValid = false;
  } else {
    RemoveError(sex);
  }

  if (numberValue == "") {
    ShowError(number, "Field required");
    isValid = false;
  } else if (!numbersOnlyRegex.test(numberValue)) {
    ShowError(number, "Invalid Format");
    isValid = false;
  } else if (numberValue.length < 11 || numberValue.length > 12) {
    ShowError(number, "Invalid Number");
    isValid = false;
  } else {
    RemoveError(number);
  }

  if (statusValue == "") {
    ShowError(status, "Field required");
    isValid = false;
  } else if (!lettersOnlyRegex.test(statusValue)) {
    ShowError(status, "Invalid Format");
    isValid = false;
  } else {
    RemoveError(status);
  }

  if (provinceInput.value == "") {
    ShowError(province, "Field required");
    isValid = false;
  } else {
    RemoveError(province);
  }

  if (cityInput.value == "") {
    ShowError(city, "Field required");
    isValid = false;
  } else {
    RemoveError(city);
  }

  if (barangayInput.value == "") {
    ShowError(barangay, "Field required");
    isValid = false;
  } else {
    RemoveError(barangay);
  }

  if (isValid) {
    var profileForm = document.querySelector("#profileForm");
    Swal.fire({
      title: "Edit Information?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Changes saved!",
          icon: "success",
          showConfirmButton: false,
        }).then(() => {
          profileForm.submit();
        });
      }
    });
  }
}
function ChangeEmail(form) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  var email = document.querySelector("#email"),
    currentPassword = document.querySelector("#currentPassword"),
    isValid = true;

  var emailValue = email.value.trim(),
    currentPasswordValue = currentPassword.value.trim();
  if (emailValue == "") {
    ShowError(email, "Field required");
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    ShowError(email, "Invalid Format");
    isValid = false;
  } else {
    RemoveError(email);
  }

  if (currentPasswordValue == "") {
    ShowError(currentPassword, "Field required");
    isValid = false;
  }
  // add mo na lang logic mo dito pang compare ng current pass ng user
  // else if (currentPasswordValue != currentpassword) {
  //   ShowError(currentPassword, "Invalid Format");
  //   isValid = false;
  // }
  else {
    RemoveError(currentPassword);
  }
  if (isValid) {
    Swal.fire({
      title: "Change Email?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type:"POST",
          url:'/user/account/email/',
          data:{'csrfmiddlewaretoken':token,'email':document.getElementById('email').value,'currentPassword':document.getElementById('currentPassword').value},
          success:function(data)
          {
            if(data.status)
            {
              Swal.fire({
                text: data.message,
                icon: "success",
                showConfirmButton: false,
              })
            }else{
              Swal.fire({
                icon: "error",
                text: data.message,
              });
            }
          },error:function(err)
          {
            console.log(err.responseText)
          }
        })
        
      }
    });
  }
}
function ChangePassword(form) {
  var oldPassword = document.querySelector("#oldPassword"),
    newPassword = document.querySelector("#newPassword"),
    confirmPassword = document.querySelector("#confirmPassword");
  isValid = true;
  var oldPasswordValue = oldPassword.value.trim(),
    newPasswordValue = newPassword.value.trim(),
    confirmPasswordValue = confirmPassword.value.trim();

  if (oldPasswordValue == "") {
    ShowError(oldPassword, "Field required");
    isValid = false;
  } else {
    RemoveError(oldPassword);
  }

  if (newPasswordValue == "") {
    ShowError(newPassword, "Field required");
    isValid = false;
  } else if (!uppercaseRegex.test(newPasswordValue)) {
    ShowError(newPassword, "Include at least one uppercase letter");
    isValid = false;
  } else if (!lowercaseRegex.test(newPasswordValue)) {
    ShowError(newPassword, "Include at least one lowercase letter");
    isValid = false;
  } else if (!digitRegex.test(newPasswordValue)) {
    ShowError(newPassword, "Include at least one number");
    isValid = false;
  } else if (newPasswordValue.length < 8) {
    ShowError(newPassword, "Use at least 8 characters");
    isValid = false;
  } else {
    RemoveError(newPassword);
  }

  if (confirmPasswordValue == "") {
    ShowError(confirmPassword, "Field required");
    isValid = false;
  } else if (confirmPasswordValue !== newPasswordValue) {
    ShowError(newPassword, "Password not matched");
    ShowError(confirmPassword, "Password not matched");
    isValid = false;
  } else {
    RemoveError(confirmPassword);
  }

  if (isValid) {
    Swal.fire({
      title: "Change Password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
      $.ajax({
        type:"POST",
        url:"/user/account/password/",
        data:{'csrfmiddlewaretoken':token,'currentpassword':document.getElementById('oldPassword').value,'newpassword':document.getElementById('newPassword').value},
        success:(data)=>{
          if(data.status)
          {
            Swal.fire({
              text: data.message,
              icon: "success",
              showConfirmButton: false,
            })
          }else{
            Swal.fire({
              icon: "error",
              text: data.message,
            });
          }
        },error:(err)=>{
            console.log(err.responseText)
        }
      })
      
        //Swal.fire({
        //  text: "Password changed!",
        //  icon: "success",
        //  showConfirmButton: false,
        //}).then(() => {
        //  form.submit();
        //});
      }
    });
  }
}
function ShowError(input, message) {
  let parent = input.parentNode;
  let errorMessage = parent.querySelector(".errorMessage");

  input.style.borderColor = "var(--red)";
  errorMessage.innerText = message;
}
function RemoveError(input) {
  let parent = input.parentNode;
  let errorMessage = parent.querySelector(".errorMessage");

  input.style.borderColor = "";
  errorMessage.innerText = "";
}

function CalculateAge(input) {
  var dob = new Date(input.value);
  var currentDate = new Date();
  var age = currentDate.getFullYear() - dob.getFullYear();

  if (
    currentDate.getMonth() < dob.getMonth() ||
    (currentDate.getMonth() === dob.getMonth() &&
      currentDate.getDate() < dob.getDate())
  ) {
    age--;
  }

  var ageElement = document.querySelector("#age");
  ageElement.value = age;

  if (age < 18) {
    input.value = "";
    ShowError(input, "Person too young");
  } else {
    RemoveError(ageElement);
  }
}

function previewImage(event) {
  var fileInput = event.target;
  var file = fileInput.files[0];

  if (file) {
    if (validateFileType(file) && validateFileSize(file)) {
      previewFile(file);
    } else {
      Swal.fire({
        text: "Please select a JPEG, JPG, or PNG file under 5MB.",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
      fileInput.value = "";
    }
  }
}
function previewFile(file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var previewImage = document.getElementById("picture");
    previewImage.src = e.target.result;
  };

  reader.readAsDataURL(file);
}
function handleDrop(event) {
  event.preventDefault();
  event.stopPropagation();

  var file = event.dataTransfer.files[0];
  if (validateFileType(file) && validateFileSize(file)) {
    previewFile(file);
  } else {
    Swal.fire({
      text: "Drop a JPEG, JPG, or PNG file under 5MB.",
      icon: "warning",
      timer: 2000,
      showConfirmButton: false,
    });
  }
}
function validateFileType(file) {
  var allowedExtensions = /(\.jpeg|\.jpg|\.png)$/i;
  return allowedExtensions.exec(file.name);
}

function validateFileSize(file) {
  var maxSizeInBytes = 5 * 1024 * 1024;
  return file.size <= maxSizeInBytes;
}

function handleDragOver(event) {
  event.preventDefault();
  event.stopPropagation();
}

function ShowForms(form, formInput) {
  formInput.style.display = "flex";
  form.style.display = "flex";
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
    RemoveError(input);
  });
}
function ShowForms1(form, formInput, element) {
  var formKey = element.getAttribute("form-key");
  let key = 0;
  var title = form.querySelector("#formTitle");
  var honorsContainer1 = document.querySelector("#honorsContainer1");
  var honorsContainer2 = document.querySelector("#honorsContainer2");
  var honorsContainer3 = document.querySelector("#honorsContainer3");
  var awardTemplate = document.querySelector("#awardTemplate");
  var addDetailsButton = document.querySelector("#addDetailsButton");

  if (formKey == 1) {
    title.innerHTML = "Honor";
    key = formKey;
  } else if (formKey == 2) {
    title.innerHTML = "Awards";
    key = formKey;
  } else if (formKey == 3) {
    title.innerHTML = "Certificate";
    key = formKey;
  }
  formInput.style.display = "flex";
  form.style.display = "flex";

  var awardName = form.querySelector("#awardName");
  var awardDate = form.querySelector("#awardDate");
  addDetailsButton.onclick = () => {
    const newElement = awardTemplate.content.cloneNode(true);
    const newTitle = newElement.querySelector("#awardTitle");
    const newDate = newElement.querySelector("#awardDate");
    const awardTitleHidden = newElement.querySelector("#awardTitleHidden");
    const awardDateHidden = newElement.querySelector("#awardDateHidden");
    const awardLocation = newElement.querySelector("#awardLocation");
    const schoolAttended = document.querySelector("#schoolAttended");
    awardNameValue = awardName.value;
    awardDateValue = awardDate.value;

    newTitle.innerText = awardNameValue;
    newDate.innerText = awardDateValue;
    awardLocation.innerText = schoolAttended.value.trim();
    awardTitleHidden.value = awardNameValue;
    awardDateHidden.value = awardDateValue;

    // if (key == 1) {
    //   formInput.style.display = "none";
    //   form.style.display = "none";
    //   awardName.value = "";
    //   awardDate.value = "";
    // }
    if (key == 2) {
      form.action = "/dyanlang/";
      SubmitForm(form);
      formInput.style.display = "none";
      form.style.display = "none";
      awardName.value = "";
      awardDate.value = "";
    }
    if (key == 3) {
      form.action = "/ditolang/";
      SubmitForm(form);
      formInput.style.display = "none";
      form.style.display = "none";
      awardName.value = "";
      awardDate.value = "";
    }
  };
}

function SubmitForm(form) {
  Swal.fire({
    title: "Save Information",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        text: "Information saved!",
        icon: "success",
        showConfirmButton: false,
      }).then(() => {
        form.submit();
      });
    }
  });
}

function Closeform(form, formInput) {
  formInput.style.display = "none";
  form.style.display = "none";
}

function ValidateSchool(form) {
  var inputs = form.querySelectorAll("input");
  isValid = true;

  inputs.forEach((input) => {
    
    if(input.id == "major" || input.id === "award")
    {
      
    }else{
      if (input.value == "") {
        ShowError(input, "Field Required");
        isValid = false;
        console.log(input.innerHTML)
      } else {
        RemoveError(input);
      }
    }
    
  });
  
  if (isValid) {
    Swal.fire({
      title: "Save Information",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Information saved!",
          icon: "success",
          showConfirmButton: false,
        }).then(() => {
          $.ajax({
            type:"POST",
            url:'/user/education/',
            data:{'csrfmiddlewaretoken':token,'uni':document.getElementById('schoolAttended').value,'deg':document.getElementById('course').value,'maj':document.getElementById('major').value,'award':document.getElementById('award').value,'graduated':document.getElementById('graduated').value,},
            success:function(data)
            {
              
              populateOnce(data.data)
              Closeform(educAddForm,formsInput)
            },
            error:function(err)
            {
              console.log(err.responseText)
            }
          })
        });
      }
    });
  }
}

function ValidateDate(input) {
  var selectedDate = new Date(input.value);
  var currentDate = new Date();

  if (selectedDate > currentDate) {
    input.value = "";
    ShowError(input, "Please select a date in the past or today");
  } else {
    RemoveError(input);
  }
}

function DeleteAward(element) {
  var awardContainer = element.closest(".awardContainer");
  awardContainer.parentNode.removeChild(awardContainer);
}
function DeleteEducation() {
  Swal.fire({
    title: "Delete ?",
    text: "You won't be able to revert this",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        text: "Deleted",
        icon: "success",
        showConfirmButton: false,
      }).then(() => {
        profileForm.submit();
      });
    }
  });
}
const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    RemoveError(input);
  });
});
var schoolAttended = document.querySelector("#schoolAttended");

schoolAttended.addEventListener("input", () => {
  const awardLocation = document.querySelectorAll(".awardLocation");
  awardLocation.forEach((award) => {
    award.innerText = schoolAttended.value;
  });
});

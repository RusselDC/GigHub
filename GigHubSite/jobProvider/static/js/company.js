function showValue(selectElement, input) {
    var selectedText = selectElement.options[selectElement.selectedIndex].text;
    input.value = selectedText;
    selectElement.style.borderColor = "";
    RemoveError(selectElement);
  }
  function Validate(form) {
    const inputs = form.querySelectorAll("input[type='text']");
    const selects = form.querySelectorAll("select");
    const provinceInput = form.querySelector("#provinceInput"),
      cityInput = form.querySelector("#cityInput"),
      barangayInput = form.querySelector("#barangayInput"),
      province = form.querySelector("#province"),
      city = form.querySelector("#city"),
      barangay = form.querySelector("#barangay");
    isValid = true;
  
    var locationInput = [provinceInput, cityInput, barangayInput];
    var location = [province, city, barangay];
    locationInput.forEach((input, selectedIndex) => {
      if (input.value === "") {
        isValid = false;
        ShowError(location[selectedIndex], "Field required");
      } else {
        RemoveError(location[selectedIndex]);
      }
    });
    inputs.forEach((input) => {
      if (input.value == "") {
        isValid = false;
        ShowError(input, "Field required");
      } else {
        RemoveError(input);
      }
    });
    selects.forEach((select) => {
      if (select.value == "") {
        isValid = false;
        ShowError(select, "Field required");
      } else {
        RemoveError(select);
      }
    });
    if (isValid) {
      Swal.fire({
        title: "Add Company?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            text: "Company Added",
            icon: "success",
            showConfirmButton: false,
          }).then(() => {
            form.submit();
          });
        }
      });
    }
  }
  function Validate1(form) {
    const inputs = form.querySelectorAll("input[type='text']");
    const selects = form.querySelectorAll("select");
    const provinceInput = form.querySelector("#provinceInput"),
      cityInput = form.querySelector("#cityInput"),
      barangayInput = form.querySelector("#barangayInput"),
      province = form.querySelector("#provinceAdmin"),
      city = form.querySelector("#cityAdmin"),
      barangay = form.querySelector("#barangayAdmin");
    isValid = true;
  
    var locationInput = [provinceInput, cityInput, barangayInput];
    var location = [province, city, barangay];
    locationInput.forEach((input, selectedIndex) => {
      if (input.value === "") {
        isValid = false;
        ShowError(location[selectedIndex], "Field required");
      } else {
        RemoveError(location[selectedIndex]);
      }
    });
    inputs.forEach((input) => {
      if (input.value == "") {
        isValid = false;
        ShowError(input, "Field required");
      } else {
        RemoveError(input);
      }
    });
    selects.forEach((select) => {
      if (select.value == "") {
        isValid = false;
        ShowError(select, "Field required");
      } else {
        RemoveError(select);
      }
    });
    if (isValid) {
      Swal.fire({
        title: "Add Company?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type:"POST",
            url:'/provider/company/',
            data:{'csrfmiddlewaretoken':token,'name':document.getElementById('name').value,'industry':document.getElementById('industry').value,'empRange':document.getElementById('employees').value,'designation':document.getElementById('designation').value,
            'province':document.getElementById('provinceInput').value,'city':document.getElementById('cityInput').value,
            'baranggay':document.getElementById('barangayInput').value,'street':document.getElementById('street').value,'bldg':document.getElementById('bldg').value},
            success:(data)=>{
              console.log(data)
              if(data.status)
              {
                CloseForm(document.getElementById('forms'))
                Swal.fire({
                  text: "Company Added",
                  icon: "success",
                  showConfirmButton: false,
                })
                
              }
            },error:(err)=>{
              console.log(err.responseText)
            }
          })
          //Swal.fire({
          //  text: "Company Added",
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
  
  function CloseForm(element) {
    element.style.display = "none";
  }
  function ShowForm(element) {
    element.style.display = "flex";
    const inputs = element.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
      RemoveError(input);
    });
    const selects = element.querySelectorAll("select");
    selects.forEach((input) => {
      RemoveError(input);
    });
  }
  
  function BackButton() {
    const companyContainer = document.querySelector("#companyContainer"),
      companyDetails = document.querySelector("#companyDetails");
    companyDetails.classList.remove("show");
    companyContainer.classList.add("show");
  }
  
  function ViewDetails(id) {
    const companyContainer = document.querySelector("#companyContainer"),
    companyDetails = document.querySelector("#companyDetails");
    $.ajax({
      type:"GET",
      url:`/provider/getCompany/${id}/`,
      success:(data)=>{
        console.log(data)
        document.getElementById('nameEdit').value = data.data.name

        var selectElement = document.getElementById('industryEdit')
        selectElement.options[0].value = data.data.industry
        selectElement.options[0].text = data.data.industry
        selectElement.options[0].selected = true
        selectElement.options[0].disabled = false

        var selectElement2 = document.getElementById('employeesEdit')
        selectElement2.options[0].value = data.data.empRange
        selectElement2.options[0].text = data.data.empRange
        selectElement2.options[0].selected = true
        selectElement2.options[0].disabled = false

        var selectElement3 = document.getElementById('provinceEdit')
        var newoption = document.createElement('option')
        document.getElementById('provinceInputEdit').value = data.data.province
        newoption.value = data.data.province
        newoption.text = data.data.province
        selectElement3.insertBefore(newoption,selectElement3.options[0])
        newoption.selected = true;

        var selectElement4 = document.getElementById('cityEdit')
        var newoption2 = document.createElement('option')
        document.getElementById('cityInputEdit').value = data.data.city
        newoption2.value = data.data.city
        newoption2.text = data.data.city
        selectElement4.insertBefore(newoption2,selectElement4.options[0])
        newoption2.selected = true;

        var selectElement5 = document.getElementById('barangayEdit')
        var newoption3 = document.createElement('option')
        document.getElementById('barangayInputEdit').value = data.data.baranggay
        newoption3.value = data.data.baranggay
        newoption3.text = data.data.baranggay
        selectElement5.insertBefore(newoption3,selectElement5.options[0])
        newoption3.selected = true;
        document.getElementById('streetEdit').value = data.data.strt
        document.getElementById('bldgEdit').value = data.data.bldgNo

        var selectElement6 = document.getElementById('designationEdit')
        selectElement6.options[0].value = data.data.designation
        selectElement6.options[0].text = data.data.designation
        selectElement6.options[0].selected = true

        document.getElementById('editbutton').addEventListener('click',()=>{
          Validate2(formEdit,id)
        })
        
        
        
        
      },error:(err)=>{
        console.log(err.responseText)
      }
    })
    companyContainer.classList.remove("show");
    companyDetails.classList.add("show");
  }
  const selects = form.querySelectorAll("select");
  selects.forEach((select) => {
    select.addEventListener("change", function () {
      RemoveError(select);
    });
  });
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      RemoveError(input);
    });
  });
  
  const formTitles = document.querySelectorAll(".formTitles"),
  formContent = document.querySelectorAll(".companyDetailsSection");
  
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


  function Validate2(form, id) {
   
    document.getElementById('companyID').value = id
    const inputs = form.querySelectorAll("input[type='text']");
    const selects = form.querySelectorAll("select");
    const provinceInput = form.querySelector("#provinceInputEdit"),
      cityInput = form.querySelector("#cityInputEdit"),
      barangayInput = form.querySelector("#barangayInputEdit"),
      province = form.querySelector("#provinceEdit"),
      city = form.querySelector("#cityEdit"),
      barangay = form.querySelector("#barangayEdit");
    isValid = true;
  
    var locationInput = [provinceInput, cityInput, barangayInput];
    var location = [province, city, barangay];
    locationInput.forEach((input, selectedIndex) => {
      if (input.value === "") {
        isValid = false;
        ShowError(location[selectedIndex], "Field required");
      } else {
        RemoveError(location[selectedIndex]);
      }
    });
    inputs.forEach((input) => {
      if (input.value == "") {
        isValid = false;
        ShowError(input, "Field required");
      } else {
        RemoveError(input);
      }
    });
    selects.forEach((select) => {
      if (select.value == "") {
        isValid = false;
        ShowError(select, "Field required");
      } else {
        RemoveError(select);
      }
    });
    if (isValid) {
      Swal.fire({
        title: "Add Company?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            text: "Company Added",
            icon: "success",
            showConfirmButton: false,
          }).then(() => {
            form.submit();
          });
        }
      });
    }
  }
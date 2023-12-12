function AcceptApplicant(btn,id) {
  Swal.fire({
    title: "Hire Applicant",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type:"GET",
        url:`/provider/hire/${id}`,
        success:function(data){
          if(data.status)
          {
            btn.style = "display:none"
            let parentNode = btn.parentNode
            parentNode.parentNode.querySelector('.statusTable').textContent = "Hired"
            let acceptElement = parentNode.querySelector("#rejectBtn");
            acceptElement.style = "display:''"
            Swal.fire({
              text: "Applicant Hired",
              icon: "success",
              showConfirmButton: false,
            });
          }
        },error:function(err){
          console.log(err.responseText)
        }
      })
     
    }
  });
}

function MoveOnApplicant(btn,id)
{
  
  Swal.fire({
    title: "Accept Applicant",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type:"GET",
        url:`/provider/accept/${id}`,
        success:function(data){
          if(data.status)
          {
            btn.style = "display:none"
            let parentNode = btn.parentNode
            let acceptElement = parentNode.querySelector("#accept");
            acceptElement.style = "display:''"
            parentNode.parentNode.querySelector('.statusTable').textContent = "In Progress"
            Swal.fire({
              text: "Applicant Accepted",
              icon: "success",
              showConfirmButton: false,
            });
          }
        },error:function(err){
          console.log(err.responseText)
        }
      })
  
    }
  });
}

function RejectApplicant(btn,id) {
  Swal.fire({
    title: "Reject Applicant",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type:"GET",
        url:`/provider/reject/${id}`,
        success:function(data){
          if(data.status)
          {
            btn.style = "display:none"
            let parentNode = btn.parentNode
            parentNode.parentNode.querySelector('.statusTable').textContent = "Rejected"
            let acceptElement = parentNode.querySelector("#rejectBtn");
              acceptElement.style = "display: none"
              let progress = parentNode.querySelector("#onprogress");
              progress.style = "display: none"
              Swal.fire({
                text: "Applicant Rejected",
                icon: "success",
                showConfirmButton: false,
              });
            }
          },error:function(err){
          console.log(err.responseText)
        }
      })
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

      $.ajax({
        type:"POST",
        url:"/provider/reply/",
        data:$("#submitReply").serialize(),
        success:(data)=>{
          console.log(data)
        },error:(err)=>{
          console.log(err.responseText)
        }
      })
      let template = document.querySelector('#providerReplyTemplate')
      let templateContent = template.content.cloneNode(true)

      templateContent.querySelector(".replyProviderContent").textContent = input.value
      templateContent.querySelector("#providerDateTime").textContent = getCurrentDateTime();

      document.querySelector(".commentContainer").appendChild(templateContent)


    }
  }
  const textarea = document.querySelectorAll("textarea");
  textarea.forEach((input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "";
    });
  });
  
  function ViewDetails(div,id) {
    $.ajax({
      type: "GET",
      url: `/provider/getApplicant/${id}`,
      success: (data) => {
          console.log(data)
          document.getElementById('postTitle').textContent = data.name
          document.getElementById('name').textContent = data.name
          document.getElementById('email').textContent = data.email
          document.getElementById('number').textContent = data.contact
          document.querySelector('#educationList').innerHTML = ""
          document.querySelector('#experienceContainer').innerHTML = ""
          document.querySelector('#awardList').innerHTML = ""
          document.querySelector('#certificateList').innerHTML = ""
          document.querySelector('.commentContainer').innerHTML = ""
          data.colleges.forEach(element => {
              let template = document.querySelector('#educationTemplate');
              let templateContent = template.content.cloneNode(true);
              console.log(templateContent.querySelector('#collegeName'))
  
              templateContent.querySelector('#collegeName').textContent = element.school[0]
              templateContent.querySelector('#CourseName').textContent = element.course[0]
              templateContent.querySelector('#majorName').textContent = element.award
              templateContent.querySelector('#yearOf').textContent = `Class of ${element.year}`
  
              document.querySelector('#educationList').appendChild(templateContent);
          })

          data.employment.forEach(element => {
            let template = document.querySelector('#employmentTemplate');
            let templateContent = template.content.cloneNode(true);
            let dutyList = templateContent.querySelector("#dutyList")

            
            templateContent.querySelector('.group1 span:nth-child(1)').textContent = element.name;
            templateContent.querySelector('.group1 span:nth-child(2)').textContent = element.position;
            templateContent.querySelector('.group2 span').textContent = `${element.start} - ${element.end}`;


            element.duties.forEach(duty=>{
              let listTemplate = document.querySelector('#duties')
              let listtemplateContent = listTemplate.content.cloneNode(true);
              
              listtemplateContent.querySelector('#dutySpan').textContent = duty

              dutyList.appendChild(listtemplateContent)

            })  
            document.querySelector('#experienceContainer').appendChild(templateContent);
          });

          data.awards.forEach(award=>{
            let template = document.querySelector('#awardsTemplate')
            let templateContent = template.content.cloneNode(true)

            templateContent.querySelector("#awardName").textContent = award.title
            templateContent.querySelector("#awardFrom").textContent = award.from
            templateContent.querySelector("#awardDate").textContent = award.date

            document.querySelector("#awardList").appendChild(templateContent)
          })

          data.certificates.forEach(award=>{
            let template = document.querySelector('#awardsTemplate')
            let templateContent = template.content.cloneNode(true)

            templateContent.querySelector("#awardName").textContent = award.title
            templateContent.querySelector("#awardFrom").textContent = award.from
            templateContent.querySelector("#awardDate").textContent = award.date

            document.querySelector("#certificateList").appendChild(templateContent)
          })

          document.getElementById('techSkills').textContent = data.skills.join(' | ')
          document.getElementById('roomIDcontainer').value = data.room

          data.messages.forEach(message=>{
            if(message.role == "JP")
            {
              let template = document.querySelector('#providerReplyTemplate')
              let templateContent = template.content.cloneNode(true)

              templateContent.querySelector("#userImg").src = message.sender
              templateContent.querySelector(".replyProviderContent").textContent = message.content
              templateContent.querySelector("#providerDateTime").textContent = message.date

              document.querySelector(".commentContainer").appendChild(templateContent)
            }else{
              let template = document.querySelector('#userReplyTemplate')
              let templateContent = template.content.cloneNode(true)

              templateContent.querySelector("#userImg").src = message.sender
              templateContent.querySelector(".replyUserContent").textContent = message.content
              templateContent.querySelector("#userDateTime").textContent = message.date

              document.querySelector(".commentContainer").appendChild(templateContent)
            }
          })
  
      }, error: (err) => {
          console.log(err.responseText)
      }
  })
    div.style.display = "flex";
  }
  
  function HideModal(event, el) {
    var modal = document.getElementById("detailsContainer");
  
    if (event.target !== modal && !modal.contains(event.target)) {
      el.style.display = "none";
    }
  }
  
  function BackButton() {
    window.location.href = "/provider/jobs/";
  }
  
  function getCurrentDateTime() {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    const currentDate = new Date();
  
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
  
    // Convert 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;
  
    const formattedDateTime = `${month} ${day}, ${year} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  
    return formattedDateTime;
  }
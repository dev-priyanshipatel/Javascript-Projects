$(document).ready(function() {
          $('select').niceSelect();
   
          function priorityText(priority){
            switch(priority){
              case "1" : 
                return `<span class="badge rounded-pill text-bg-danger">High priority</span>`;
              case "2" : 
                return `<span class="badge rounded-pill text-bg-warning text-white">Medium priority</span>`;
              case "3" : 
                return `<span class="badge rounded-pill text-bg-success">Low priority</span>`;
            }
          }
          
          function showtask(){
            
            if (taskArr.length === 0) {
              $(".empty-state").show();
            } else {
              $(".empty-state").hide();
            }

            document.getElementById("taskList").innerHTML = "";

            taskArr.forEach((data,idx) => {
              document.getElementById("taskList").innerHTML += `
               
                  <div class = "task-item d-flex justify-content-between bg-color"> 
                    <div>
                      <h3>${data.task}</h3>
                      <h4>${priorityText(data.priority)}</h4>
                    </div>
                    <div class ="delete-btn" data-index="${idx}">
                      <img src ="./assets/photos/download.svg" alt ="delete">
                  </div>
               `
            })
          }

          $("#taskList").on("click", ".delete-btn", function () {
            let taskIndex = $(this).data("index");
            taskArr.splice(taskIndex, 1);
            showtask();
          });

          let taskArr =[];

          $("#add-btn").on("click",function(){

            let task = $("#input-task").val().trim();
            let priority = $("#priority").val();
  
            if (task === "" || priority === "" || priority === "Select Your Priority") {
              Swal.fire({
              title: "Please Enter Task And Priority",
              icon: "error"
              });
            return; 
            }
            if(task && priority){
               
              let taskListObj = {
                Id : Date.now(),
                task : task,
                priority : priority,
              }   

            taskArr.push(taskListObj);
            taskArr.sort((a, b) => Number(a.priority) - Number(b.priority));

            showtask();

            $("#input-task").val("");    
            $("#priority").val("").niceSelect("update"); 
            }
          })
      });
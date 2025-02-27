//creating a global event listener
function addGlobalEventListener(type,selector, callback){
    document.addEventListener(type, e => {
    if(e.target.matches(selector)){
    callback(e)
  };
  })}
  
  //deleting a task
  addGlobalEventListener("click", ".deleteTask", e=> {
    const taskElement = e.target.closest(".task");
    if (taskElement){
      taskElement.remove();
    }
  });
  
  //adding a task
  addGlobalEventListener("click",".addTask", e=>{
    const taskContainer = document.querySelector(".taskContainer");
    taskContainer.appendChild(createTaskElement());
  })
  
  //function creates task element
  function createTaskElement(title="Task Title: ", description="Task Description: "){
    const task = document.createElement("div");
    task.classList.add("task");
    
    task.innerHTML = `
    <div class="taskHeading">
      <h3 class="taskTitle">${title}</h3> 
      <div class="taskButtons">
        <button class="editTask">Edit Task</button>
        <button class="deleteTask">Delete Task</button>
      </div>
    </div>
    <p class="taskDescription">${description}</p>
  `;
  
    return task;
  }

  let currentTask;
  
  //editing a task
  addGlobalEventListener("click",".editTask",e=>{
    const closestTask = e.target.closest(".task");
    currentTask = e.target.closest(".task"); 
    if (closestTask){
      const updateForm = document.getElementById("updateForm");
      updateForm.style.display = "block";
    }
  })

  //updating a task

  addGlobalEventListener("click",".saveTaskChanges", e=>{
    e.preventDefault();
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;
    currentTask.querySelector(".taskTitle").textContent = `Task Title: ${taskTitle}`;
    currentTask.querySelector(".taskDescription").textContent = `Task Description: ${taskDescription}`;
  })
  
//creating a global event listener
function addGlobalEventListener(type,selector, callback){
    document.addEventListener(type, e => {
    if(e.target.matches(selector)){
    callback(e)
  };
  });
  }
  
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
  function createTaskElement(){
    const task = document.createElement("div");
    task.classList.add("task");
    
    const taskHeading = document.createElement("div");
    taskHeading.classList.add("taskHeading");
    
    const taskTitle = document.createElement("h3");
    taskTitle.classList.add("taskTitle");
    taskTitle.textContent = "Task Title";
    
    const taskButtons = document.createElement("div");
    taskButtons.classList.add("taskButtons");
    
    const editButton = document.createElement("button");
    editButton.classList.add("editTask");
    editButton.textContent = "Edit Task";
    
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteTask");
    deleteButton.textContent = "Delete Task";
    
    taskButtons.appendChild(editButton);
    taskButtons.appendChild(deleteButton);
    
    taskHeading.appendChild(taskTitle);
    taskHeading.appendChild(taskButtons);
    
    const taskDescription = document.createElement("p");
    taskDescription.classList.add("taskDescription");
    taskDescription.textContent = "Task Description";
  
    task.appendChild(taskHeading);
    task.appendChild(taskDescription);
  
    return task;
  }
  
  //editing a task
  addGlobalEventListener("click",".editTask",e=>{
    console.log("hello")
  })
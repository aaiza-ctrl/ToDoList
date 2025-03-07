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
      saveTasksToLocalStorage();
    }
  });
  
  //adding a task
  addGlobalEventListener("click",".addTask", e=>{
    const taskContainer = document.querySelector(".taskContainer");
    taskContainer.appendChild(createTaskElement());
    saveTasksToLocalStorage();
  })
  
  //function creates task element
  function createTaskElement(title="Title: ", description="Description: "){
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
    
    if (taskTitle === "" || taskDescription === "") {
      alert("Please fill out both the title and description.");
      return; 
    }

    currentTask.querySelector(".taskTitle").textContent = `Title: ${taskTitle}`;
    currentTask.querySelector(".taskDescription").textContent = `Description: ${taskDescription}`;

    document.getElementById("updateForm").style.display = "none";

    document.getElementById("updateForm").reset();

    saveTasksToLocalStorage();
  })
  

function saveTasksToLocalStorage(){
  const tasks = Array.from(document.querySelectorAll(".task")).map(task => ({
    title: task.querySelector(".taskTitle").textContent,
    description: task.querySelector(".taskDescription").textContent,
  })
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage(){
  const taskContainer = document.querySelector(".taskContainer");
  taskContainer.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const newTask = createTaskElement(task.title, task.description);
    document.querySelector(".taskContainer").appendChild(newTask);
  })
}

document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
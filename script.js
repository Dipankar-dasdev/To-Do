const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const addTaskButton = document.getElementById("add-task-button");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list");
const priority = document.getElementById("priority");
const taskWarning = document.getElementById("task-warning");
const noTaskDiv = document.querySelector(".no-task");
const taskCountSpan = document.getElementById("task-count");

for (const task of tasks) {
  taskList.appendChild(createTask(task));
}

updateNoTaskMessage();

addTaskButton.addEventListener("click", addTask);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  const taskPriority = priority.value;

  if (taskText === "") {
    taskWarning.style.display = "block";
    return;
  }

  taskWarning.style.display = "none";

  const task = {
    taskText,
    taskPriority,
    completed: false,
  };

  tasks.push(task);
  saveTasks();

  const taskItem = createTask(task);

  taskList.appendChild(taskItem);

  taskInput.value = "";

  updateNoTaskMessage();
}

function createTask(task) {
  const editinput = document.createElement("input");
  editinput.classList.add("editText");
  editinput.hidden = true;

  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item", task.taskPriority);

  const checkbox = createCheckbox();
  checkbox.checked = task.completed;

  const text = document.createElement("span");
  text.classList.add("task-text");
  text.textContent = task.taskText;

  text.classList.toggle("completed", task.completed);

  const deleteButton = createDeleteButton();
  const editButton = createEditButton();

  checkbox.addEventListener("change", function () {
    task.completed = checkbox.checked;
    text.classList.toggle("completed", checkbox.checked);
    saveTasks();
  });

  deleteButton.addEventListener("click", function () {
    taskItem.remove();

    tasks.splice(tasks.indexOf(task), 1);

    saveTasks();
    updateNoTaskMessage();
  });

  editButton.addEventListener("click", function(){
    if(editinput.hidden === true){
      console.log("clicked");
      text.hidden = true;
      editinput.hidden = false;
      editinput.value = task.taskText;
      editButton.textContent="✔️";
      editinput.focus();
      editinput.select();
    }else{
      task.taskText = editinput.value;
      text.textContent = task.taskText;
      editinput.hidden = true;
      text.hidden = false;
      editButton.textContent = "✏️";
      saveTasks();
    }
      
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(text);
  taskItem.appendChild(editinput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  return taskItem;
}

function createCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");

  return checkbox;
}

function createDeleteButton() {
  const button = document.createElement("button");
  button.textContent = "X";
  button.classList.add("delete-button");

  return button;
}

function createEditButton(){
  const button = document.createElement("button");
  button.textContent="✏️";
  button.classList.add("edit");

  return button;
};

function updateNoTaskMessage() {
  const taskCount = tasks.length;

  taskCountSpan.textContent = taskCount;

  if (taskCount === 0) {
    noTaskDiv.style.display = "block";
  } else {
    noTaskDiv.style.display = "none";
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
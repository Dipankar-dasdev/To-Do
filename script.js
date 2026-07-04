console.log("Script loaded");

const addTaskButton = document.getElementById("add-task-button");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list");
const priority=document.getElementById("priority");
const taskWarning = document.getElementById("task-warning");

addTaskButton.addEventListener("click", addTask);


document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  const taskPriority = priority.value;

  if (!taskText) {
    taskWarning.style.display = "block";
  }else{
    taskWarning.style.display = "none";
    const taskItem = createTask(taskText, taskPriority);

    taskList.appendChild(taskItem);
    taskInput.value = "";
    updateNoTaskMessage();
  }
}

function createTask(taskText, taskPriority) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskItem.classList.add(taskPriority);

  const checkbox = createCheckbox();

  const text = document.createElement("span");
  text.classList.add("task-text");
  text.textContent = taskText;

  const deleteButton = createDeleteButton();

  checkbox.addEventListener("change", function () {
    text.classList.toggle("completed", checkbox.checked);
  });

  deleteButton.addEventListener("click", function () {
    taskItem.remove();
    updateNoTaskMessage();
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(text);
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

const noTaskDiv = document.querySelector(".no-task");
const taskCountSpan = document.getElementById("task-count");

function updateNoTaskMessage() {

  const taskCount = taskList.childElementCount;

  taskCountSpan.textContent = taskCount-1;

  if (taskCount === 1) {
    noTaskDiv.style.display = "block";
  } else {
    noTaskDiv.style.display = "none";
  }
}


console.log("Script loaded");

const addTaskButton = document.getElementById("add-task-button");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list");

addTaskButton.addEventListener("click", addTask);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task before adding.");
    return;
  }

  const taskItem = createTask(taskText);

  taskList.appendChild(taskItem);
  taskInput.value = "";
}

function createTask(taskText) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

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
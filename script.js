const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const addTaskButton = document.getElementById("add-task-button");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list");
const priority = document.getElementById("priority");
const taskWarning = document.getElementById("task-warning");
const noTaskDiv = document.querySelector(".no-task");
const taskCountSpan = document.getElementById("task-count");
const filters = document.querySelectorAll(".task-filter");

for (const task of tasks) {
  taskList.appendChild(createTask(task));
}

updateNoTaskMessage();

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

setupFilters();

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

  tasks.unshift(task);
  saveTasks();

  const taskCard = createTask(task);
  taskList.prepend(taskCard);

  taskInput.value = "";

  updateNoTaskMessage();
}

function createTask(task) {
  const editinput = document.createElement("input");
  editinput.classList.add("editText");
  editinput.hidden = true;

  const taskCard = document.createElement("div");
  // taskCard.classList.add("task-item", task.taskPriority);
  taskCard.classList.add("task-item");
  taskCard.dataset.priority = task.taskPriority;

  const checkbox = createCheckbox();
  checkbox.checked = task.completed;

  // const text = document.createElement("span");
  // text.classList.add("task-text");
  // text.textContent = task.taskText;

  const { taskContent, taskTitle, priorityBadge } = createTaskContent(task);
  taskTitle.classList.toggle("completed", task.completed);

  const deleteButton = createDeleteButton();
  const editButton = createEditButton();

  checkbox.addEventListener("change", function () {
    task.completed = checkbox.checked;
    taskTitle.classList.toggle("completed", checkbox.checked);
    saveTasks();
  });

  deleteButton.addEventListener("click", function () {
    taskCard.remove();

    tasks.splice(tasks.indexOf(task), 1);

    saveTasks();
    updateNoTaskMessage();
  });

  editButton.addEventListener("click", function () {
    taskWarning.style.display = "none";

    if (editinput.hidden) {
      taskTitle.hidden = true;
      priorityBadge.hidden = true;

      editinput.hidden = false;
      editinput.value = task.taskText;

      editButton.textContent = "✔️";

      editinput.focus();
      editinput.select();
    } else {
      if (editinput.value.trim() === "") {
        taskWarning.style.display = "block";
        return;
      }

      task.taskText = editinput.value.trim();
      taskTitle.textContent = task.taskText;

      editinput.hidden = true;
      taskTitle.hidden = false;
      priorityBadge.hidden = false;

      editButton.textContent = "✏️";

      saveTasks();
    }
  });

  editinput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      editButton.click();
    }
  });

  taskCard.appendChild(checkbox);
  // taskCard.appendChild(text);
  taskCard.appendChild(taskContent);
  taskCard.appendChild(editinput);
  taskCard.appendChild(editButton);
  taskCard.appendChild(deleteButton);

  return taskCard;
}

function setupFilters() {
  for (const button of filters) {
    button.addEventListener("click", function (event) {
      const clickedButton = event.currentTarget;
      const selectedFilter = clickedButton.textContent;
      const taskCards = document.querySelectorAll(".task-item");
      for (const task of taskCards) {
        if (selectedFilter === "All") {
          console.log(task);
          task.style.display = "flex";
        } else if (
          selectedFilter === "High" ||
          selectedFilter === "Low" ||
          selectedFilter === "Medium"
        ) {
          if (selectedFilter === task.dataset.priority) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
        } else if (
          selectedFilter === "Completed" ||
          selectedFilter === "Active"
        ) {
          const completedTask = task.querySelector(".completed");
          if (selectedFilter === "Completed" && completedTask) {
            task.style.display = "flex";
          } else if (selectedFilter === "Active" && !completedTask) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
        }
      }
    });
  }
}

function createTaskContent(task) {
  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const taskTitle = document.createElement("div");
  taskTitle.classList.add("task-text");
  taskTitle.textContent = task.taskText;

  const priorityBadge = document.createElement("div");
  priorityBadge.classList.add("task-p");
  priorityBadge.classList.add(task.taskPriority);
  priorityBadge.textContent = task.taskPriority;

  taskContent.appendChild(taskTitle);
  taskContent.appendChild(priorityBadge);

  return {
    taskContent,
    taskTitle,
    priorityBadge,
  };
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

function createEditButton() {
  const button = document.createElement("button");
  button.textContent = "✏️";
  button.classList.add("edit");

  return button;
}

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

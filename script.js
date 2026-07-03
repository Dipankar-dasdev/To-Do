console.log("Script loaded 123");
const addTaskButton = document.getElementById("add-task-button");
const taskInput = document.querySelector(".task-input");

addTaskButton.addEventListener("click", function () {
  
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskList = document.querySelector(".task-list");
    const taskItem = document.createElement("div");
    const text = document.createElement("span");
    const deleteButton = document.createElement("button");
    const checkbox = document.createElement("input");

    checkbox.addEventListener("change", function (event) {
      if (event.target.checked) {
        // text.style.textDecoration = "line-through";
        // text.style.color = "gray";
        text.classList.add("completed");
      } else {
        // text.style.textDecoration = "none";
        // text.style.color = "white ";
        text.classList.remove("completed");
      }
    });

    deleteButton.addEventListener("click", function (event) {
      const taskItem = event.target.parentElement;
      taskItem.remove();
    });

    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    text.textContent = taskText;
    deleteButton.textContent = "X";
    text.classList.add("task-text");
    deleteButton.classList.add("delete-button");
    taskItem.classList.add("task-item");
    taskList.appendChild(taskItem);
    taskItem.appendChild(checkbox);
    taskItem.appendChild(text);
    taskItem.appendChild(deleteButton);
    taskInput.value = "";
  } else {
    alert("Please enter a task before adding.");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTaskButton.click();
  }
});

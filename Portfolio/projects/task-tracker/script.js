const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");
const clearCompleted = document.getElementById("clearCompleted");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.className = "task-item";

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="task-actions">
        <button class="complete-btn" onclick="toggleComplete(${index})">
          ${task.completed ? "Undo" : "Complete"}
        </button>
        <button class="delete-btn" onclick="deleteTask(${index})">
          Delete
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask(taskText) {
  const newTask = {
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  displayTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    message.textContent = "Please enter a task before adding it.";
    return;
  }

  message.textContent = "";
  addTask(taskText);
  taskInput.value = "";
});

clearCompleted.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return task.completed === false;
  });

  saveTasks();
  displayTasks();
});

displayTasks();
import { TaskManager } from "./managers/TaskManager.js";
import { UserManager } from "./managers/UserManager.js";

const taskManager = new TaskManager();
const userManager = new UserManager();
taskManager.loadFromLocalStorage();
userManager.loadFromLocalStorage();

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const categoryInput = document.getElementById("task-category");
const priorityInput = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");
const userForm = document.getElementById("user-form");
const usernameInput = document.getElementById("username");
const currentUserDisplay = document.getElementById("current-user");

function renderTasks() {
  taskList.innerHTML = "";
  const user = userManager.getCurrentUser();
  if (!user) return;

  const tasks = taskManager.filterTasksByUser(user);
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.content}</span>
      <span>[${task.status}]</span>
      <span>(${task.category})</span>
      <span>${task.priority}</span>
      <button data-id="${task.id}" class="done-btn">done</button>
      <button data-id="${task.id}" class="delete-btn">delete</button>
    `;
    taskList.appendChild(li);
  });
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const content = taskInput.value.trim();
  const category = categoryInput.value;
  const priority = priorityInput.value;
  const user = userManager.getCurrentUser();

  if (!content || !user) return;

  taskManager.addTask(content, user, category, priority);
  taskManager.saveToLocalStorage();
  renderTasks();
  taskForm.reset();
});

taskList.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("done-btn")) {
    taskManager.toggleTaskStatus(id);
  } else if (e.target.classList.contains("delete-btn")) {
    taskManager.deleteTask(id);
  }

  taskManager.saveToLocalStorage();
  renderTasks();
});

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return;

  userManager.addUser(username);
  userManager.saveToLocalStorage();

  const current = userManager.getCurrentUser();
  currentUserDisplay.textContent = current;
  renderTasks();
  userForm.reset();
});

const currentUser = userManager.getCurrentUser();
if (currentUser) {
  currentUserDisplay.textContent = currentUser;
  renderTasks();
}

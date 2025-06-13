import { Task } from "./Task.js";
import { generateID } from "./utils.js";

export class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(content, user, category, priority) {
    const id = generateID();
    const task = new Task(id, content, user, category, priority);
    this.tasks.push(task);
    return task;
  }

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(id, { content, category, priority }) {
    const task = this.getTaskById(id);
    if (task) {
      if (content) task.updateContent(content);
      if (category) task.updateCategory(category);
      if (priority) task.updatePriority(priority);
    }
  }

  toggleTaskStatus(id) {
    const task = this.getTaskById(id);
    if (task) {
      task.toggleStatus();
    }
  }

  filterTasksByStatus(status) {
    return this.tasks.filter((task) => task.status === status);
  }

  filterTasksByUser(user) {
    return this.tasks.filter((task) => task.user === user);
  }

  sortByDate(desc = false) {
    return this.tasks
      .slice()
      .sort((a, b) =>
        desc ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
      );
  }

  saveToLocalStorage() {
    localStorage.setItem(
      "tasks",
      JSON.stringify(this.tasks.map((t) => t.toJSON()))
    );
  }

  loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    this.tasks = data.map((taskJson) => Task.fromJSON(taskJson));
  }
}

export class UserManager {
  constructor() {
    this.users = [];
    this.currentUser = null;
  }

  addUser(username) {
    if (!this.users.includes(username)) {
      this.users.push(username);
    }
    this.currentUser = username;
  }

  setCurrentUser(username) {
    if (this.users.includes(username)) {
      this.currentUser = username;
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getAllUsers() {
    return this.users;
  }

  loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    const current = localStorage.getItem("currentUser") || null;
    this.users = data;
    this.currentUser = current;
  }

  saveToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(this.users));
    localStorage.setItem("currentUser", this.currentUser);
  }
}

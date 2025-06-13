export class Task {
  constructor(id, content, user, category = "general", priority = "medium") {
    this.id = id;
    this.content = content;
    this.user = user;
    this.status = "pending";
    this.createdAt = new Date();
    this.category = category;
    this.priority = priority;
  }

  markAsDone() {
    this.status = "done";
  }

  markAsPending() {
    this.status = "pending";
  }

  toggleStatus() {
    this.status = this.status === "pending" ? "done" : "pending";
  }

  updateContent(newContent) {
    this.content = newContent;
  }

  updateCategory(newCategory) {
    this.category = newCategory;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  toJSON() {
    return {
      id: this.id,
      content: this.content,
      user: this.user,
      status: this.status,
      createdAt: this.createdAt,
      category: this.category,
      priority: this.priority,
    };
  }

  static fromJSON(json) {
    const task = new Task(
      json.id,
      json.content,
      json.user,
      json.category,
      json.priority
    );
    task.status = json.status;
    task.createdAt = new Date(json.createdAt);
    return task;
  }
}

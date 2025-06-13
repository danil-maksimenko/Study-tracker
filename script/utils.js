export function generateID() {
  return Date.now().toString() + Math.random().toString(36).substring(2, 5);
}

export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

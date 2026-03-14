export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("Browser does not support notifications");
    return;
  }
  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
};

export const showNotification = (title, body) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body: body,
      icon: "/pwa-192.png"
    });
  }
};

export const checkTodayTasks = (tasks) => {
  const today = new Date().toISOString().split("T")[0];
  tasks.forEach(task => {
    if (task.dueDate === today && task.status !== "completed") {
      showNotification(
        "Task Reminder",
        `${task.title} is due today`
      );
    }
  });
};
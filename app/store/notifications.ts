type Notification = {
  id: number;
  status: "success" | "error";
  message: string;
  duration?: number;
};

const DEFAULT_DURATION = 5000;

export const useNotificationsStore = defineStore("notifications", () => {
  const active = ref<Notification[]>([]);

  function create(data: { status: Notification["status"]; message: string; duration?: number }) {
    const notification = { duration: DEFAULT_DURATION, ...data, id: Math.random() * 1000 };
    active.value = [...active.value, notification];
    if (notification.duration > 0) {
      setTimeout(dismiss, notification.duration, notification);
    }
  }

  function dismiss(notification: Notification) {
    active.value = active.value.filter(entry => entry.id !== notification.id);
  };

  return { active, create, dismiss };
});

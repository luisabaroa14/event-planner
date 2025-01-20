import { reactive } from "vue";

export const toasts = reactive({
  messages: [],
  show(message, type = "success", duration = 4000) {
    const id = Date.now();
    if (!message) return;
    this.messages.push({ id, message, type });
    setTimeout(() => {
      this.messages = this.messages.filter((msg) => msg.id !== id);
    }, duration);
  },
  remove(id) {
    this.messages = this.messages.filter((msg) => msg.id !== id);
  },
});

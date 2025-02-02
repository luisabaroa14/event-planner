import { defineStore } from "pinia";
import orderService from "@/services/orders";
import { ref } from "vue";
import { toasts } from "@/utils/toast.js";
import strings from "@/utils/strings.js";

export const useOrderStore = defineStore("orderStore", () => {
  // State
  const errorMessage = ref(null);

  // Actions
  const createOrder = async (order) => {
    const response = await orderService.createOrder(order);
    if (response.success) {
      toasts.show(strings.orderCreated);
      return true;
    }
    errorMessage.value = "Failed to create order";
    return false;
  };

  // Return state, actions, and getters
  return {
    createOrder,
  };
});

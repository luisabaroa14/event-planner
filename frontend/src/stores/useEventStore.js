import { defineStore } from "pinia";
import eventService from "@/services/events";
import filesService from "@/services/files";
import { v4 as uuidv4 } from "uuid";
import { ref, computed, watch } from "vue";

export const useEventStore = defineStore("eventStore", () => {
  // State
  const events = ref([]);
  const cartEventIds = ref([]);
  const errorMessage = ref(null);
  const quantities = ref({});

  // Load data
  if (localStorage.getItem("cartEventIds")) {
    cartEventIds.value = JSON.parse(localStorage.getItem("cartEventIds"));
  }
  if (localStorage.getItem("eventQuantities")) {
    quantities.value = JSON.parse(localStorage.getItem("eventQuantities"));
  }

  const cartEvents = computed(() => {
    return events.value.filter((event) =>
      cartEventIds.value.includes(event.id)
    );
  });

  watch(
    () => quantities.value,
    () => {
      localStorage.setItem("eventQuantities", JSON.stringify(quantities.value));
    },
    { deep: true }
  );

  watch(
    () => cartEventIds.value,
    () => {
      localStorage.setItem("cartEventIds", JSON.stringify(cartEventIds.value));
    },
    { deep: true }
  );

  // Actions
  fetchEvents();

  async function fetchEvents() {
    const response = await eventService.fetchEvents();
    if (response.success) {
      events.value = response.data;
    } else {
      errorMessage.value = "Failed to fetch events";
    }
  }

  const createEvent = async (event, uploadFile = false) => {
    // Upload image if it exists
    if (uploadFile && event?.image) {
      // Generate a unique id and a path for the image
      const imageId = uuidv4();
      const storagePath = `events/${imageId}`;

      const response = await filesService.uploadFile(event.image, storagePath);
      if (response.success) {
        event.image = response.data;
      } else {
        return { success: false, error: response.error };
      }
    }

    const response = await eventService.createEvent(event);
    if (response.success) {
      events.value.push(response.data);
    } else {
      errorMessage.value = "Failed to create event";
    }
  };

  const updateEvent = async (event, uploadFile = false) => {
    // Upload image if it exists
    if (uploadFile && event?.image) {
      // Generate a unique id and a path for the image
      const imageId = uuidv4();
      const storagePath = `events/${imageId}`;

      const response = await filesService.uploadFile(event.image, storagePath);
      if (response.success) {
        event.image = response.data;
      } else {
        return { success: false, error: response.error };
      }
    }

    const response = await eventService.updateEvent(event);
    if (response.success) {
      const index = events.value.findIndex((e) => e.id === event.id);
      if (index !== -1) {
        events.value[index] = response.data;
      }
    } else {
      errorMessage.value = "Failed to update event";
    }
  };

  const deleteEvent = async (eventId) => {
    const response = await eventService.deleteEvent(eventId);
    if (response.success) {
      events.value = events.value.filter((e) => e.id !== eventId);
    } else {
      errorMessage.value = "Failed to delete event";
    }
  };

  const addToCart = (eventId) => {
    if (
      events.value.find((event) => event.id === eventId) &&
      !cartEventIds.value.includes(eventId)
    ) {
      cartEventIds.value.push(eventId);
      quantities.value[eventId] = 1;
    }
  };

  const removeFromCart = (eventId) => {
    cartEventIds.value = cartEventIds.value.filter((id) => id !== eventId);
    delete quantities.value[eventId];
  };

  const decrementQuantity = (eventId) => {
    if (quantities.value[eventId] > 1) {
      quantities.value[eventId]--;
    } else {
      removeFromCart(eventId);
    }
  };

  // Getters
  const getEventById = (id) => {
    return events.value.find((event) => event.id === id);
  };

  return {
    // State
    events,
    cartEvents,
    cartEventIds,
    quantities,

    // Actions
    errorMessage,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    addToCart,
    removeFromCart,
    decrementQuantity,
  };
});

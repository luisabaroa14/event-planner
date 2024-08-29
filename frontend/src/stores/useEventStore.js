import { defineStore } from "pinia";
import eventService from "@/services/events";
import filesService from "@/services/files";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

export const useEventStore = defineStore("eventStore", () => {
  // State
  const events = ref([]);
  const errorMessage = ref(null);

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

  // Getters
  const getEventById = (id) => {
    return events.value.find((event) => event.id === id);
  };

  // Return state, actions, and getters
  return {
    events,
    errorMessage,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
  };
});

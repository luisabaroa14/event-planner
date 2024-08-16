import { getEvents } from "@/utils/data";

export default {
    async getEvents() {
      try {
        const events = getEvents()
        return { success: true, data: events };
      } catch (error) {
        console.error('Failed to fetch events', error);
        return { success: false, data: null };
      }
    },
  
    async createEvent(event) {
      try {
        const newEvent = { id: Date.now(), ...event };
        return { success: true, data: newEvent };
      } catch (error) {
        console.error('Failed to create event', error);
        return { success: false, data: null };
      }
    },
  
    async updateEvent(event) {
      try {
        return { success: true, data: event };
      } catch (error) {
        console.error('Failed to update event', error);
        return { success: false, data: null };
      }
    },
  
    async deleteEvent(eventId) {
      try {
        return { success: true, data: null };
      } catch (error) {
        console.error('Failed to delete event', error);
        return { success: false, data: null };
      }
    },
  };
  
<template>
  <div class="m-5">
    <h1>Add Event</h1>
    <form @submit.prevent="addEvent">
      <div class="mb-3">
        <label for="name" class="form-label">Event Name</label>
        <input
          type="text"
          id="name"
          v-model="event.name"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Event Date</label>
        <input
          type="date"
          id="date"
          v-model="event.date"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="location" class="form-label">Event Location</label>
        <input
          type="text"
          id="location"
          v-model="event.location"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Event</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const event = ref({
  name: "",
  date: "",
  location: "",
});

const addEvent = async () => {
  try {
    const response = await fetch("http://localhost:3300/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event.value),
    });

    if (!response.ok) {
      throw new Error("Failed to add event");
    }

    const result = await response.json();
    console.log("Event added:", result);

    // Clear the form
    event.value = {
      name: "",
      date: "",
      location: "",
    };
  } catch (error) {
    console.error("Error adding event:", error);
  }
};
</script>

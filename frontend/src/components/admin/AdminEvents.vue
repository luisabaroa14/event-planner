<script setup>
import { ref } from "vue";
import { useEventStore } from "@/stores/useEventStore";

const eventStore = useEventStore();

const name = ref("");
const location = ref("");
const date = ref("");

const updateEvent = ref(null);

const clearForm = () => {
  name.value = "";
  location.value = "";
  date.value = "";

  updateEvent.value = null;
};

const handleCreateEvent = async () => {
  await eventStore.createEvent({
    id: 1,
    name: name.value,
    location: location.value,
    date: date.value,
  });

  clearForm();
};

const handleUpdateEvent = async () => {
  await eventStore.updateEvent(updateEvent.value);

  clearForm();
};
</script>

<template>
  <div>
    <div v-if="updateEvent">
      <h3>Update Event</h3>
      <form @submit.prevent="handleUpdateEvent">
        <label>Name:</label>
        <input class="w-100 mb-1" v-model="updateEvent.name" required />
        <br />
        <label>Location:</label>
        <input class="w-100 mb-1" v-model="updateEvent.location" required />
        <br />
        <label>Date:</label>
        <input
          class="w-100 mb-2"
          type="date"
          v-model="updateEvent.date"
          required
        />
        <br />
        <button class="btn btn-primary w-100" @click="updateEvent = null">
          Cancel
        </button>
        <button class="btn btn-primary w-100 mt-3" type="submit">
          Update Event
        </button>
      </form>
    </div>
    <div v-else>
      <h3>Add Event</h3>
      <form @submit.prevent="handleCreateEvent">
        <label>Name:</label>
        <input class="w-100 mb-1" v-model="name" required />
        <br />
        <label>Location:</label>
        <input class="w-100 mb-1" v-model="location" required />
        <br />
        <label>Date:</label>
        <input class="w-100 mb-2" type="date" v-model="date" required />
        <br />
        <button class="btn btn-primary w-100" type="submit">Add Event</button>
      </form>
    </div>

    <h3 class="mt-4">Events</h3>
    <table class="w-100">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in eventStore.events" :key="event.id">
          <td>{{ event.name }}</td>
          <td>{{ event.location }}</td>
          <td>{{ new Date(event.date).toDateString() }}</td>
          <td>
            <button
              class="btn btn-secondary"
              @click="updateEvent = JSON.parse(JSON.stringify(event))"
            >
              Update
            </button>
            <button
              class="btn btn-danger ms-2"
              @click="eventStore.deleteEvent(event.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

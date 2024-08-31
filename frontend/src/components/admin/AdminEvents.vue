<script setup>
import { ref } from "vue";
import { useEventStore } from "@/stores/useEventStore";
import { formatDateForInput, parseDateAtMidnight } from "@/utils/functions";

const eventStore = useEventStore();

const name = ref("");
const description = ref("");
const location = ref("");
const date = ref("");
const price = ref(0);
const image = ref(null);
const uploadFile = ref(false);

const eventToUpdate = ref(null);

const clearForm = () => {
  name.value = "";
  image.value = "";
  location.value = "";
  description.value = "";
  price.value = "";
  date.value = "";

  uploadFile.value = false;
  eventToUpdate.value = null;
};

const handleCreateEvent = async () => {
  await eventStore.createEvent(
    {
      name: name.value,
      image: image.value,
      location: location.value,
      description: description.value,
      price: price.value,
      date: date.value,
    },
    uploadFile.value
  );

  clearForm();
};

const handleUpdateEvent = async () => {
  if (uploadFile.value && image.value) {
    eventToUpdate.value.image = image.value;
  }
  await eventStore.updateEvent(eventToUpdate.value, uploadFile.value);

  clearForm();
};

const updateEvent = (event) => {
  eventToUpdate.value = JSON.parse(JSON.stringify(event));
  eventToUpdate.value.date = new Date(event.date);

  // If the image is a URL, set uploadFile to false
  uploadFile.value = false;
};

// Handle file upload
const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  // Set the image value to the file
  image.value = file;
  uploadFile.value = true;
};
</script>

<template>
  <div>
    <div v-if="eventToUpdate">
      <h3>Update Event</h3>
      <form @submit.prevent="handleUpdateEvent">
        <label>Name:</label>
        <input
          class="form-control w-100"
          v-model="eventToUpdate.name"
          required
        />
        <br />
        <label>Description:</label>
        <input
          class="form-control w-100"
          v-model="eventToUpdate.description"
          required
        />
        <br />
        <label>Location:</label>
        <input
          class="form-control w-100"
          v-model="eventToUpdate.location"
          required
        />
        <br />
        <label>Price:</label>
        <div class="input-group">
          <input
            class="form-control"
            type="number"
            v-model="eventToUpdate.price"
            required
            step="any"
            @input="
              (event) => {
                eventToUpdate.value.price = event.target.value.replace('-', '');
              }
            "
          />
          <div class="input-group-append">
            <span
              class="input-group-text bg-primary border-primary rounded-0 rounded-end text-white ms-1"
            >
              $
            </span>
          </div>
        </div>
        <br />
        <label>Image:</label>
        <div class="input-group">
          <input
            v-if="!uploadFile"
            id="image-url"
            v-model="eventToUpdate.image"
            class="form-control"
            type="url"
            placeholder="Enter image URL"
          />
          <input
            v-if="uploadFile"
            id="image-file"
            class="form-control"
            type="file"
            @change="handleFileUpload"
          />
          <button
            class="ms-1 btn btn-primary"
            type="button"
            @click="uploadFile = !uploadFile"
          >
            {{ uploadFile ? "Use Link" : "Upload File" }}
          </button>
        </div>
        <label>Date:</label>
        <input
          class="form-control w-100"
          type="date"
          @input="eventToUpdate.date = parseDateAtMidnight($event.target.value)"
          :value="formatDateForInput(eventToUpdate.date)"
          required
        />
        <br />
        <button class="btn btn-primary w-100" @click="eventToUpdate = null">
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
        <input class="form-control w-100" v-model="name" required />
        <br />
        <label>Description:</label>
        <input class="form-control w-100" v-model="description" required />
        <br />
        <label>Location:</label>
        <input class="form-control w-100" v-model="location" required />
        <br />
        <label>Price:</label>
        <div class="input-group">
          <input
            type="number"
            class="form-control"
            v-model="price"
            required
            step="any"
            @input="
              (event) => {
                price.value = event.target.value.replace('-', '');
              }
            "
          />
          <div class="input-group-append">
            <span
              class="input-group-text bg-primary border-primary rounded-0 rounded-end text-white ms-1"
            >
              $
            </span>
          </div>
        </div>
        <br />
        <label>Image:</label>
        <div class="input-group">
          <input
            v-if="!uploadFile"
            id="image-url"
            v-model="image"
            class="form-control"
            type="url"
            placeholder="Enter image URL"
          />
          <input
            v-if="uploadFile"
            id="image-file"
            class="form-control"
            type="file"
            @change="handleFileUpload"
          />
          <button
            class="ms-1 btn btn-primary"
            type="button"
            @click="uploadFile = !uploadFile"
          >
            {{ uploadFile ? "Use Link" : "Upload File" }}
          </button>
        </div>

        <br />
        <label>Date:</label>
        <input class="form-control w-100" type="date" v-model="date" required />
        <br />
        <button class="btn btn-primary w-100" type="submit">Add Event</button>
      </form>
    </div>

    <h3 class="mt-4">Events</h3>
    <table class="w-100">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Description</th>
          <th>Location</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in eventStore.events" :key="event.id">
          <td>{{ event.name }}</td>
          <td>
            <img :src="event.image" style="width: 100px; height: 100px" />
          </td>
          <td>{{ event.price }}</td>
          <td>{{ event.description }}</td>
          <td>{{ event.location }}</td>
          <td>{{ event.date.toDateString() }}</td>
          <td>
            <button class="btn btn-secondary" @click="updateEvent(event)">
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

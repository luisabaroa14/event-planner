<script setup>
import { ref, onMounted } from "vue";
import { capitalizeFirstLetter } from "@/utils/functions";
// import AdminEvents from "@/components/admin/AdminEvents.vue";
import AdminProducts from "@/components/admin/AdminProducts.vue";
import AdminCollaborators from "@/components/admin/AdminCollaborators.vue";
import AdminExperiences from "@/components/admin/AdminExperiences.vue";

// Selected option state
const selectedOption = ref("products");

// Password protection
const adminPassword = ref("");
const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;
const storedPassword = ref(null);

// Check localStorage on component mount
onMounted(() => {
  storedPassword.value = localStorage.getItem("adminPassword");
});

// Function to check password
const checkPassword = () => {
  if (adminPassword.value === correctPassword) {
    localStorage.setItem("adminPassword", adminPassword.value); // Store password
    storedPassword.value = adminPassword.value; // Update ref
  } else {
    alert("Incorrect password. Try again.");
  }
};

// Function to log out
const logout = () => {
  localStorage.removeItem("adminPassword"); // Remove stored password
  storedPassword.value = null; // Reset ref
};
</script>

<template>
  <div class="mt-5 mx-3 p-4">
    <div
      v-if="storedPassword !== correctPassword"
      class="d-flex flex-column align-items-center mt-6"
    >
      <h3>Enter Admin Password</h3>
      <input
        type="password"
        v-model="adminPassword"
        class="form-control w-25 mt-2"
        placeholder="Enter password"
      />
      <button class="btn btn-primary mt-2" @click="checkPassword">Login</button>
    </div>
    <div v-else>
      <div class="d-flex flex-row justify-content-between">
        <h2>
          <strong>{{ capitalizeFirstLetter(selectedOption) }}</strong>
        </h2>
        <button class="btn btn-secondary" @click="logout">Logout</button>

        <!-- Picker at the top -->
        <select v-model="selectedOption" class="form-control w-10 mb-4 p-2">
          <option value="products">Products</option>
          <option value="experiences">Experiences</option>
          <option value="collaborator">Collaborator</option>
          <!-- <option value="events">Events</option> -->
        </select>
      </div>

      <!-- <AdminEvents v-if="selectedOption === 'events'" class="mt-2" /> -->
      <AdminProducts v-if="selectedOption === 'products'" class="mt-2" />
      <AdminExperiences v-if="selectedOption === 'experiences'" class="mt-2" />
      <AdminCollaborators
        v-if="selectedOption === 'collaborator'"
        class="mt-2"
      />
    </div>
  </div>
</template>

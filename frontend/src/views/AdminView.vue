<script setup>
import { ref } from "vue";
import { capitalizeFirstLetter } from "@/utils/functions";
import AdminEvents from "@/components/admin/AdminEvents.vue";
import AdminProducts from '@/components/admin/AdminProducts.vue';
import AdminCollaborators from '@/components/admin/AdminCollaborators.vue';

// Selected option state
const selectedOption = ref("events");
</script>

<template>
  <div class="mt-5 mx-3 p-4">
    <div class="d-flex flex-row justify-content-between">
      <h2>
        <strong>{{ capitalizeFirstLetter(selectedOption) }}</strong>
      </h2>

      <!-- Picker at the top -->
      <select v-model="selectedOption" class="form-control w-10 mb-4 p-2">
        <option value="events">Events</option>
        <option value="products">Products</option>
        <option value="collaborator">Collaborator</option>
      </select>
    </div>

    <AdminEvents v-if="selectedOption === 'events'" class="mt-2" />
    <AdminProducts v-if="selectedOption === 'products'" class="mt-2" />
    <AdminCollaborators v-if="selectedOption === 'collaborator'" class="mt-2" />
  </div>
</template>

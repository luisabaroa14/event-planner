<script setup>
import { ref } from "vue";
import { capitalizeFirstLetter } from "@/utils/functions";
import AdminEvents from "@/components/admin/AdminEvents.vue";
// import AdminProduct from '@/components/AdminProduct.vue';
// import AdminChef from '@/components/AdminChef.vue';

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
      <select v-model="selectedOption" class="mb-4 p-2">
        <option value="events">Events</option>
        <option value="products">Products</option>
        <option value="chefs">Chefs</option>
      </select>
    </div>

    <AdminEvents v-if="selectedOption === 'events'" class="mt-2" />
  </div>
</template>

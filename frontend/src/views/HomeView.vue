<script setup>
import EventList from "../components/EventList.vue";
import { getEvents } from "../utils/data";
</script>

<template>
  <div class="h-100 d-flex flex-column p-3">
    <div class="mt-5 mx-3">
      <div>
        <h1>Home</h1>
        <h2>Savor the Flavor: A Culinary Adventure Awaits!</h2>
      </div>
      <EventList :events="getEvents()" />
    </div>
  </div>
</template>

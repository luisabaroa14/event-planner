<script setup>
import EventsCalendar from "../components/EventsCalendar.vue";
import EventList from "../components/EventList.vue";
import img from "@/assets/images/plate.png";
import { getEvents } from "../utils/data";

const loadEvents = async () => {
  try {
    const response = await fetch("http://localhost:3300/api/events");
    events.value = await response.json();
  } catch (error) {
    console.error("Error loading events:", error);
  }
};
</script>

<template>
  <div class="d-flex flex-column mt-5 mx-3 p-3">
    <div class="d-flex flex-row my-3" style="height: 250px">
      <img :src="img" class="large-screen rounded" />
      <EventsCalendar :events="events" :collaborator-id="null" />
    </div>
    <EventList title="Upcomming Events" :events="getEvents()" />
  </div>
</template>

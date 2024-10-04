<script setup>
import EventsCalendar from "../components/EventsCalendar.vue";
import EventList from "../components/EventList.vue";
import img from "@/assets/images/plate.png";
import { useEventStore } from "@/stores/useEventStore";

const eventStore = useEventStore();
</script>

<template>
  <div class="d-flex flex-column mt-5 mx-3 p-3">
    <div class="d-flex flex-row my-3" style="height: 270px">
      <img :src="img" class="large-screen rounded" />
      <EventsCalendar :events="eventStore.events" :collaborator-id="null" />
    </div>
    <EventList title="Upcomming Events" :events="eventStore.events" />
  </div>
</template>

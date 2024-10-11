<script setup>
import EventsCalendar from "../components/EventsCalendar.vue";
import EventList from "../components/EventList.vue";
import img from "@/assets/images/plate.png";
import { useEventStore } from "@/stores/useEventStore";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const eventStore = useEventStore();

const collaboratorId = computed(() => route.query.c);

const events = computed(() =>
  eventStore.events.filter((event) => {
    const matchesCollaborator =
      !collaboratorId.value || event.collaboratorId === collaboratorId.value;

    return matchesCollaborator;
  })
);
</script>

<template>
  <div class="d-flex flex-column mt-5 mx-3 p-3">
    <div class="d-flex flex-row my-3" style="height: 270px">
      <img :src="img" class="large-screen rounded" />
      <EventsCalendar :events="events" :collaborator-id="collaboratorId" />
    </div>
    <EventList title="Upcomming Events" :events="events" :collaborator-id="collaboratorId"  />
  </div>
</template>

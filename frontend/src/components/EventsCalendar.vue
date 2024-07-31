<script setup>
// https://vcalendar.io/calendar/dates.html
import { ref, computed } from "vue";

// Define props for event dates
const props = defineProps({ events: Array, collaboratorId: Number });

const selectedDate = ref(new Date());

// Define the attributes for the select date
const selectAttribute = {
  highlight: {
    color: "blue",
    fillMode: "light",
    style: {
      boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.5)",
    },
  },
};

// Filter the events by collaborator ID and map them to the calendar attributes
const calendarEvents = computed(() => {
  return (
    props.events
      // Filter events if collaborator ID is provided
      ?.filter(
        (e) =>
          !props.collaboratorId || e.collaboratorId === props.collaboratorId
      )
      .map((event) => {
        return {
          highlight: {
            // color: "orange",
            class: "bg-primary",
          },
          dates: new Date(event.date),
          popover: {
            label: event.name,
          },
        };
      })
  );
});
</script>

<template>
  <VDatePicker
    class="w-100 h-100"
    v-model="selectedDate"
    :attributes="calendarEvents"
    :select-attribute="selectAttribute"
    :first-day-of-week="2"
    color="orange"
    transparent
  />
</template>

<style>
.vc-container .vc-weekday {
  /* color: black; */
  color: var(--bs-primary);
}

.vc-container .vc-arrow,
.vc-container .vc-title {
  background-color: transparent;
}
</style>

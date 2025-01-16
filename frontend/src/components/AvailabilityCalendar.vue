<script setup>
import { ref, computed } from "vue";
import { getNextDates } from "@/utils/functions";

const props = defineProps({ availableDates: Object });
const emit = defineEmits(["scheduleExperience"]);

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

const calendarDates = computed(() => {
  const availableDates = props.availableDates;

  const patternDates = getNextDates(availableDates?.patterns, new Date(), 4); // Get the next 4 months' worth of pattern dates
  const extraDates = availableDates?.extraDates?.map((d) => new Date(d)) ?? [];
  const blockedDates =
    availableDates?.blockedDates?.map((d) => new Date(d)) ?? [];

  // Merge pattern dates with extra dates
  let allDates = [...patternDates, ...extraDates];

  // Remove blocked dates
  allDates = allDates.filter(
    (date) =>
      !blockedDates.some(
        (blockedDate) => date.getTime() === blockedDate.getTime()
      )
  );

  return allDates.map((date) => ({
    highlight: { class: "bg-primary" },
    dates: date,
    popover: true,
  }));
});
</script>

<template>
  <VDatePicker
    class="w-100 h-100"
    v-model="selectedDate"
    :attributes="calendarDates"
    :select-attribute="selectAttribute"
    :first-day-of-week="2"
    color="orange"
    transparent
  >
    <template #day-popover>
      <div
        class="btn btn-primary"
        @click="emit('scheduleExperience', selectedDate)"
      >
        Schedule experience
        <i class="fas fa-champagne-glasses"></i>
      </div>
    </template>
  </VDatePicker>
</template>

<style>
.vc-container .vc-weekday {
  color: var(--bs-primary);
}

.vc-container .vc-arrow,
.vc-container .vc-title {
  background-color: transparent;
}
</style>

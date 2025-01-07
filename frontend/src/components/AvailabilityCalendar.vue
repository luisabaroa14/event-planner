<script setup>
import { ref, computed } from "vue";

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

/**
  Get the next dates based for the pattern
  @param {string} pattern - The pattern to match (e.g. "monday, wednesday")
  @param {Date} startDate - The start date
  @param {number} monthsAhead - The number of months to look ahead
  @returns {Date[]} - The next dates that match the pattern
**/
const getNextDates = (pattern, startDate, monthsAhead) => {
  if (!pattern) return [];

  const dates = [];
  const start = new Date(startDate);
  start.setDate(1); // Start from the first of the month
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let monthOffset = 0; monthOffset < monthsAhead; monthOffset++) {
    const monthStart = new Date(start);
    monthStart.setMonth(start.getMonth() + monthOffset);
    const currentMonth = monthStart.getMonth();

    // Generate the dates based on the pattern
    for (let dayOffset = 1; dayOffset <= 31; dayOffset++) {
      const date = new Date(monthStart);
      date.setHours(0, 0, 0, 0);
      date.setDate(dayOffset);

      // Check if the date is within the correct month and matches the pattern
      if (date.getMonth() !== currentMonth) continue;

      if (
        date.getTime() > today.getTime() &&
        pattern.includes(
          date.toLocaleString("en-US", { weekday: "long" }).toLowerCase()
        )
      ) {
        dates.push(date);
      }
    }
  }

  return dates;
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

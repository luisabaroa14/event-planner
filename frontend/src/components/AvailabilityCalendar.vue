<script setup>
import { computed } from "vue";
import { getNextDates } from "@/utils/functions";
import { useExperienceStore } from "@/stores/useExperienceStore";

const experienceStore = useExperienceStore();

const emit = defineEmits(["scheduleExperience"]);

const props = defineProps({
  availableDates: Object,
  finalDates: Array,
  popover: { type: Boolean, default: false },
});

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

// Used for when the final dates are passed in
const mappedCalendarDates = computed(() => {
  const finalDates = props.finalDates;

  // If there are no final dates, return null
  if (!finalDates?.length) return null;

  return finalDates.map((date) => ({
    highlight: { class: "bg-danger" },
    dates: date,
    popover: props.popover,
  }));
});

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
    popover: props.popover,
  }));
});
</script>

<template>
  <VDatePicker
    class="w-100 h-100"
    v-model="experienceStore.customExperience.date"
    :attributes="mappedCalendarDates ?? calendarDates"
    :select-attribute="selectAttribute"
    :first-day-of-week="2"
    color="orange"
    transparent
  >
    <template #day-popover>
      <div
        class="btn btn-primary"
        @click="emit('scheduleExperience', experienceStore.customExperience.date)"
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

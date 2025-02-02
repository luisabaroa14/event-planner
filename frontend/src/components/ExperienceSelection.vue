<script setup>
import { computed, watch } from "vue";
import { useExperienceStore } from "@/stores/useExperienceStore";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import AvailabilityCalendar from "@/components/AvailabilityCalendar.vue";
import ExperienceList from "@/components/ExperienceList.vue";
import { getNextDates } from "@/utils/functions";
import { toasts } from "@/utils/toast.js";
import dayjs from "dayjs";
import strings from "@/utils/strings";

const experienceStore = useExperienceStore();
const collaboratorStore = useCollaboratorStore();

const allCollaboratorsAvailableDates = computed(() => {
  const result = {};

  // Map the available dates for each collaborator
  collaboratorStore.collaborators.forEach((collaborator) => {
    const today = new Date();
    const availableDates = collaborator.availableDates;
    // Generate pattern and extra dates
    const patternDates = getNextDates(availableDates?.patterns, new Date(), 4);
    const extraDates =
      availableDates?.extraDates.map((date) => new Date(date)) ?? [];

    // Combine all available dates
    let allDates = [...patternDates, ...extraDates];

    // Collect blocked dates
    const blockedDates =
      availableDates?.blockedDates.map((date) => new Date(date)) ?? [];

    // Remove blocked dates and dates that are in the past
    allDates = allDates.filter(
      (date) =>
        !blockedDates.some(
          (blockedDate) => blockedDate.getTime() === date.getTime()
        ) && date.getTime() > today.getTime()
    );
    result[collaborator.id] = allDates;
  });

  return result;
});

watch(
  () => experienceStore.customExperience.date,
  (date, previousDate) => {
    if (date !== previousDate && date) {
      // Check if the experiences are still available or remove them
      experienceStore.customExperience.experienceIds =
        experienceStore.customExperience.experienceIds.filter(
          (experienceId) => {
            const experience = experienceStore.getExperienceById(experienceId);
            const availableDates =
              allCollaboratorsAvailableDates.value[experience?.collaboratorId];

            const isEventAvailable = availableDates.some(
              (availableDate) => availableDate.getTime() === date?.getTime()
            );
            if (!isEventAvailable) {
              toasts.show(strings.experienceNotAvailable);
            }

            return isEventAvailable;
          }
        );
    }
  },
  { deep: true }
);

const filteredExperiencesByDate = computed(() => {
  const date = experienceStore.customExperience?.date;
  const experienceIds = experienceStore.customExperience?.experienceIds;

  let availableCollaboratorIds = [];

  // If a date is selected filter the collaborators that have that date available
  if (date) {
    availableCollaboratorIds = collaboratorStore.collaborators
      .filter((collaborator) => {
        const availableDates =
          allCollaboratorsAvailableDates.value[collaborator.id];
        return availableDates.some(
          (availableDate) => availableDate.getTime() === date?.getTime()
        );
      })
      .map((collaborator) => collaborator.id);

    // If a experience is selected filter the collaborators that have that experience available
  } else if (experienceIds?.length) {
    const collaboratorIds = experienceStore.experiences
      .filter((experience) => experienceIds?.includes(experience.id))
      .map((experience) => experience.collaboratorId);
    availableCollaboratorIds = collaboratorIds;
  }

  // If no collaborator is available that day return empty array
  if (!availableCollaboratorIds?.length) return [];

  // Filter experience by collaborator
  return experienceStore.experiences.filter((experience) =>
    availableCollaboratorIds?.includes(experience.collaboratorId)
  );
});

const availableDates = computed(() => {
  let filteredCollaborators = [];
  const experienceIds = experienceStore.customExperience?.experienceIds;

  // If experiences are selected, filter the collaborators by the selected experiences
  if (experienceIds?.length) {
    filteredCollaborators = experienceStore.experiences
      .filter((experience) => experienceIds.includes(experience.id))
      .map((experience) => experience.collaboratorId);
  }

  let allAvailableDates = [];

  // Get available dates per collaborator
  collaboratorStore.collaborators?.forEach((collaborator) => {
    const allDates = allCollaboratorsAvailableDates.value[collaborator.id];

    if (!filteredCollaborators.length) {
      allAvailableDates.push(allDates);
    } else if (filteredCollaborators.includes(collaborator.id)) {
      allAvailableDates.push(allDates);
    }
  });

  // If multiple collaborators are selected, find the intersection of available dates
  if (filteredCollaborators.length > 1 && allAvailableDates.length > 0) {
    return allAvailableDates.reduce((acc, dates) =>
      acc.length === 0
        ? dates
        : acc.filter((date) =>
            dates.some((d) => d.getTime() === date.getTime())
          )
    );
  }

  // If only one collaborator is selected, return their dates
  return allAvailableDates.flat();
});
</script>

<template>
  <div>
    <div class="d-flex flex-wrap align-items-center">
      <h3 class="fw-bold me-4">{{ strings.selectADate }}</h3>
      <span
        v-if="experienceStore.customExperience?.date"
        class="d-flex align-items-center badge bg-primary pill me-2"
        style="height: 25px"
      >
        {{ dayjs(experienceStore.customExperience.date).format("DD MMM YYYY") }}
        <i
          class="fas fa-close ms-2"
          @click="experienceStore.customExperience.date = null"
        ></i>
      </span>
    </div>
    <div style="height: 270px">
      <AvailabilityCalendar class="mt-2" :final-dates="availableDates" />
    </div>
    <div class="d-flex flex-wrap align-items-center mt-5">
      <h3 class="fw-bold me-4">{{ strings.experiences }}</h3>
      <span
        v-for="experienceId in experienceStore.customExperience?.experienceIds"
        :key="`selected-experience-${experienceId}`"
        class="d-flex align-items-center badge bg-primary pill me-2"
        style="height: 25px"
      >
        {{ experienceStore.getExperienceById(experienceId)?.name ?? "" }}
        <i
          class="fas fa-close ms-2"
          @click="experienceStore.removeExperience(experienceId)"
        ></i>
      </span>
    </div>
    <ExperienceList :experiences="filteredExperiencesByDate" />
  </div>
</template>

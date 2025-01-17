<script setup>
import { ref, computed } from "vue";
import { useExperienceStore } from "@/stores/useExperienceStore";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import AvailabilityCalendar from "@/components/AvailabilityCalendar.vue";
import ExperienceList from "@/components/ExperienceList.vue";
import { getNextDates } from "@/utils/functions";

const collaboratorStore = useCollaboratorStore();
const experienceStore = useExperienceStore();

const currentStep = ref(1);
const stepsSize = 4;

const nextStep = () => {
  if (
    currentStep.value < stepsSize &&
    experienceStore.status[currentStep.value]
  ) {
    currentStep.value++;
    initiateProducts();
  }
};

const goToStep = (step) => {
  if (step === 1 || experienceStore.status[step - 1]) {
    currentStep.value = step;
    initiateProducts();
  }
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

const initiateProducts = () => {
  // Initiate the productIds array if it doesn't exist and the step is 3
  if (
    currentStep.value === 3 &&
    !experienceStore.customExperience?.productIds?.length
  ) {
    experienceStore.customExperience.productIds = [];
  }
};

const allCollaboratorsAvailableDates = computed(() => {
  const result = {};

  // Map the available dates for each collaborator
  collaboratorStore.collaborators.forEach((collaborator) => {
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

    // Remove blocked dates from allDates
    allDates = allDates.filter(
      (date) =>
        !blockedDates.some(
          (blockedDate) => blockedDate.getTime() === date.getTime()
        )
    );
    result[collaborator.id] = allDates;
  });

  return result;
});

const availableDates = computed(() => {
  let finalDates = [];

  // Get all pattern dates, extra dates, and blocked dates
  collaboratorStore.collaborators?.forEach((collaborator) => {
    const allDates = allCollaboratorsAvailableDates.value[collaborator.id];

    finalDates.push(...allDates);
  });

  return finalDates;
});

const filteredExperiencesByDate = computed(() => {
  const date = experienceStore.customExperience.date;

  // If no date is selected return empty array
  if (!date) return [];

  const availableCollaboratorIds = collaboratorStore.collaborators
    .filter((collaborator) => {
      const availableDates =
        allCollaboratorsAvailableDates.value[collaborator.id];
      return availableDates.some(
        (availableDate) => availableDate.getTime() === date?.getTime()
      );
    })
    .map((collaborator) => collaborator.id);

  // If no collaborator is available that day return empty array
  if (!availableCollaboratorIds?.length) return [];

  // Filter experience by collaborator
  return experienceStore.experiences.filter((experience) =>
    availableCollaboratorIds?.includes(experience.collaboratorId)
  );
});
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center p-4">
    <h2 class="mb-3">Create Your Own Experience</h2>
    <div class="d-flex flex-column w-100" v-if="currentStep === 1">
      <h3>Pick your Experience</h3>
      <AvailabilityCalendar
        class="mt-2"
        :final-dates="availableDates"
        @schedule-experience="(date) => console.log(date)"
      />
      <h2 class="fw-bold mt-5">Food Experiences</h2>
      <ExperienceList :experiences="filteredExperiencesByDate" />
    </div>
    <div v-if="currentStep === 2">
      <h3>Select your experience</h3>
      <button
        @click="experienceStore.customExperience.selectedExperiences = 'Hiking'"
      >
        Hiking
      </button>
    </div>
    <div v-if="currentStep === 3">
      <h3>How many people</h3>
      <button @click="experienceStore.customExperience.people = 5">
        Add 5 people
      </button>
    </div>
    <div v-if="currentStep === 4">
      <h3>Other products</h3>
      <button
        @click="experienceStore.customExperience.selectedProducts = 'Water'"
      >
        Water
      </button>
    </div>
    <div v-if="currentStep === 4">
      <h3>Go to Cart</h3>
    </div>

    <div class="d-flex w-100 mt-4 mb-4">
      <div class="d-flex flex-row justify-content-between w-100">
        <template v-for="step in stepsSize" :key="step">
          <div
            @click="goToStep(step)"
            class="progress flex-grow-1 mx-1"
            :class="step <= currentStep ? 'bg-primary' : 'bg-light'"
          ></div>
        </template>
      </div>
    </div>

    <div class="d-flex justify-content-center w-100 mt-2 gap-5">
      <div class="btn btn-secondary" @click="prevStep">Previous</div>
      <div class="btn btn-primary" @click="nextStep">Continue</div>
    </div>
  </div>
</template>

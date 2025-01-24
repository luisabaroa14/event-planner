<script setup>
import { computed, ref } from "vue";
import { useExperienceStore } from "@/stores/useExperienceStore";
import { useProductStore } from "@/stores/useProductStore";
import ExperienceSelection from "@/components/ExperienceSelection.vue";
import ProductList from "@/components/ProductList.vue";
import dayjs from "dayjs";

const experienceStore = useExperienceStore();
const productsStore = useProductStore();

const currentStep = ref(1);
const stepsSize = 5;

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

const sortedProducts = computed(() => {
  const experienceIds = experienceStore.customExperience?.experienceIds;
  const collaboratorIds = experienceStore.experiences
    .filter((experience) => experienceIds?.includes(experience.id))
    .map((experience) => experience.collaboratorId);

  // Filter products by colaborators from their experienceIds
  return productsStore.products.filter((product) =>
    collaboratorIds.includes(product.collaboratorId)
  );
});

const timeInput = ref(null);

const openTimePicker = () => {
  if (timeInput.value) {
    timeInput.value.showPicker(); // Try showPicker()
    timeInput.value.focus(); // Fallback
    timeInput.value.click(); // Fallback
  }
};
</script>

<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center px-4 py-2 overflow-hidden"
    style="height: 90vh"
  >
    <div v-if="currentStep === 1" class="flex-grow-1 overflow-auto w-100">
      <h2 class="fw-bold mb-4 text-center">Create Your Own Experience</h2>
      <ExperienceSelection />
    </div>
    <div v-else-if="currentStep === 4" class="flex-grow-1 overflow-auto w-100">
      <div class="d-flex flex-column mt-2">
        <h2 class="fw-bold text-center">Any last product?</h2>

        <h4 class="mt-5">Products from Your Selected Chefs</h4>
        <ProductList :products="sortedProducts" />
      </div>
    </div>

    <div
      v-else
      class="d-flex flex-column h-100 align-items-center w-100 text-center"
    >
      <div
        v-if="currentStep === 2"
        class="d-flex flex-column w-40-lg-w-80-sm mt-2"
      >
        <h2 class="fw-bold text-center">How Many People Are Joining?</h2>

        <h4 class="mt-5">Select the Number of Guests</h4>
        <span class="text-muted">
          Let us know how many guests will be attending your event.
        </span>
        <div class="input-group mt-2">
          <input
            type="number"
            class="form-control"
            v-model="experienceStore.customExperience.guests"
            step="any"
            @input="
              (p) =>
                (experienceStore.customExperience.guests =
                  p.target.value.replace('-', ''))
            "
          />
          <div class="input-group-append">
            <span
              class="input-group-text bg-primary border-primary rounded-0 rounded-end text-white ms-1 h-100"
            >
              <i class="fas fa-users"></i>
            </span>
          </div>
        </div>
        <span
          v-if="
            experienceStore.minNumberOfParts &&
            experienceStore.minNumberOfParts >
              experienceStore.customExperience.guests
          "
          class="d-block text-danger mt-2"
        >
          *The number of participants must be at least
          <strong>{{ experienceStore.minNumberOfParts }}</strong
          >.
        </span>
        <span
          v-else-if="experienceStore.customExperience.guests < 5"
          class="d-block text-danger mt-2"
        >
          *There is an extra fee for events with less than 5 guests.
        </span>
      </div>
      <div
        v-else-if="currentStep === 3"
        class="d-flex flex-column w-40-lg-w-80-sm mt-2"
      >
        <h2 class="fw-bold text-center">Plan Your Experience</h2>

        <h4 class="mt-5">Where Will Your Event Take Place?</h4>
        <span class="text-muted">
          Choose the location that best suits you.
        </span>
        <div class="input-group mt-2">
          <input
            class="form-control"
            v-model="experienceStore.customExperience.location"
            step="any"
          />
          <div class="input-group-append">
            <span
              class="input-group-text bg-primary border-primary rounded-0 rounded-end text-white ms-1 h-100"
            >
              <i class="fas fa-map-pin"></i>
            </span>
          </div>
        </div>

        <h4 class="mt-5">At What Time Will Your Event Start?</h4>
        <span class="text-muted"> Select the time your event will begin. </span>
        <div class="input-group mt-2">
          <div class="d-flex form-control flex-grow-1">
            {{
              dayjs(experienceStore.customExperience.date).format(
                "dddd, DD MMM YYYY"
              )
            }}
            at
            {{ experienceStore.customExperience.time }}
          </div>

          <input
            type="time"
            ref="timeInput"
            style="color-scheme: dark"
            class="position-absolute w-0 h-0 opacity-0 btn btn-primary"
            v-model="experienceStore.customExperience.time"
          />

          <div class="input-group-append" @click="openTimePicker" role="button">
            <span
              class="input-group-text bg-primary border-primary rounded-0 rounded-end text-white ms-1 h-100"
            >
              <i class="fas fa-clock"></i>
            </span>
          </div>
        </div>

        <span
          v-if="!experienceStore.isTimeValid"
          class="d-block text-danger mt-2"
        >
          *The available start times are between 12PM and 10PM.
        </span>
      </div>
      <div v-else-if="currentStep === 5">
        <h3>Go to Cart</h3>
      </div>
    </div>

    <div class="w-100">
      <div class="d-flex w-100 mt-5 mb-4">
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

      <div class="d-flex justify-content-center w-100 gap-5">
        <button class="btn btn-secondary" @click="prevStep">Previous</button>
        <button
          class="btn btn-primary"
          @click="nextStep"
          :disabled="
            currentStep >= stepsSize || !experienceStore.status[currentStep]
          "
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

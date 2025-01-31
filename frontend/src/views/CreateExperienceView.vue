<script setup>
import { computed, ref } from "vue";
import { useExperienceStore } from "@/stores/useExperienceStore";
import { useProductStore } from "@/stores/useProductStore";
import ExperienceSelection from "@/components/ExperienceSelection.vue";
import ProductList from "@/components/ProductList.vue";
import { toasts } from "@/utils/toast.js";
import { useRouter } from "vue-router";
import strings from "@/utils/strings";
import { experienceTimeTags } from "@/utils/tagGroups";

const experienceStore = useExperienceStore();
const productsStore = useProductStore();
const router = useRouter();

const currentStep = ref(1);
const stepsSize = 5;

const nextStep = () => {
  if (
    currentStep.value < stepsSize &&
    experienceStore.status[currentStep.value]
  ) {
    currentStep.value++;
    initiateProducts();
  } else if (currentStep.value === stepsSize) {
    router.push("/cart");
  }
};

const goToStep = (step) => {
  // Check if all previous steps are completed
  const allPreviousStepsCompleted = Object.keys(experienceStore.status)
    .slice(0, step - 1)
    .every((key) => experienceStore.status[key]);

  // Allow moving to the next step if previous steps are completed
  if (step === 1 || allPreviousStepsCompleted) {
    currentStep.value = step;
    initiateProducts();
  } else {
    toasts.show(strings.pleaseCompleteTheSteps);
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
</script>

<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center px-4 py-2 overflow-hidden"
    style="height: 90vh"
  >
    <div v-if="currentStep === 1" class="flex-grow-1 overflow-auto w-100">
      <h2 class="fw-bold mb-4 text-center">{{ strings.createYourOwnEvent }}</h2>
      <ExperienceSelection />
    </div>
    <div v-else-if="currentStep === 4" class="flex-grow-1 overflow-auto w-100">
      <div class="d-flex flex-column mt-2">
        <h2 class="fw-bold text-center">{{ strings.anyLastProduct }}</h2>

        <h4 class="mt-5">{{ strings.productsFromSelectedChefs }}</h4>
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
        <h2 class="fw-bold text-center">{{ strings.planExperience }}</h2>
        <h4 class="mt-5">{{ strings.locationOfEvent }}</h4>
        <span class="text-muted">
          {{ strings.locationOfEventSubtitle }}
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
        <h4 class="mt-5">{{ strings.timeOfEvent }}</h4>
        <span class="text-muted"> {{ strings.timeOfEventSubtitle }} </span>
        <div class="input-group mt-2 w-100 d-flex justify-content-center">
          <button
            v-for="tag in experienceTimeTags"
            :key="tag"
            @click="experienceStore.customExperience.time = tag"
            :class="[
              'btn m-1',
              experienceStore.customExperience.time === tag
                ? 'btn-primary'
                : 'btn-outline-primary',
            ]"
          >
            {{ tag.toUpperCase() }}
          </button>
        </div>
      </div>
      <div
        v-else-if="currentStep === 3"
        class="d-flex flex-column w-40-lg-w-80-sm mt-2"
      >
        <h2 class="fw-bold text-center">{{ strings.numberOfParticipants }}</h2>

        <h4 class="mt-5">{{ strings.selectNumberOfParticipants }}</h4>
        <span class="text-muted">
          {{ strings.numberOfParticipantsSubtitle }}
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
        <div
          v-if="
            experienceStore.customExperience.guests &&
            experienceStore.minNumberOfParts &&
            experienceStore.minNumberOfParts >
              experienceStore.customExperience.guests
          "
        >
          <span class="d-block text-danger mt-2">
            *{{ strings.minParticipantsForEvent }}
            <strong>{{ experienceStore.minNumberOfParts }}</strong
            >.<br />
            {{ strings.extraFeeMessage }}
            <strong>{{ experienceStore.totalFees }}$</strong>.<br />
          </span>
        </div>
      </div>
      <div v-else-if="currentStep === 5">
        <h2 class="fw-bold text-center">{{ strings.planExperience }}</h2>
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
        <button class="btn btn-secondary" @click="prevStep">
          {{ strings.previous }}
        </button>
        <button
          class="btn btn-primary"
          @click="nextStep"
          :disabled="
            currentStep >= stepsSize || !experienceStore.status[currentStep]
          "
        >
          {{ strings.continue }}
        </button>
      </div>
    </div>
  </div>
</template>

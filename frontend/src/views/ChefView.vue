<script setup>
import { computed } from "vue";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import { useProductStore } from "@/stores/useProductStore";
import { useExperienceStore } from "@/stores/useExperienceStore";
import ProductList from "../components/ProductList.vue";
import AvailabilityCalendar from "../components/AvailabilityCalendar.vue";
import { capitalizeKebab } from "@/utils/functions";
import { useRoute, useRouter } from "vue-router";
import ExperienceList from "@/components/ExperienceList.vue";

const route = useRoute();
const router = useRouter();

const collaboratorStore = useCollaboratorStore();
const productStore = useProductStore();
const experienceStore = useExperienceStore();

const collaborator = computed(() =>
  collaboratorStore.collaborators.find(
    (collaborator) => collaborator.id === route.params.id
  )
);

const filteredProducts = computed(() =>
  productStore.products.filter(
    (product) => product.collaboratorId === route.params.id
  )
);
const filteredExperiences = computed(() =>
  experienceStore.experiences.filter(
    (experience) => experience.collaboratorId === route.params.id
  )
);

const openCreateExperience = (remove = false) => {
  if (!remove) {
    router.push("/create-experience");
  }
};
</script>

<template>
  <div class="d-flex flex-column p-3">
    <div v-if="collaborator" class="d-flex flex-row-lg-column-sm">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <img
          :src="collaborator.image"
          :alt="collaborator.name"
          class="img-fluid img-300 mb-3 object-fit-cover rounded"
        />
      </div>
      <div
        class="d-flex flex-column justify-content-center align-items-center text-center mx-4"
      >
        <h1 class="fw-bold">{{ collaborator.name }}</h1>
        <h4 class="ms-1">{{ collaborator.brief }}</h4>
        <p class="ms-1">{{ collaborator.description }}</p>
        <div class="d-flex flex-wrap">
          <span
            v-for="tag in collaborator.tags"
            :key="tag"
            class="badge bg-primary me-2 mb-2 d-flex align-items-center"
          >
            {{ capitalizeKebab(tag) }}
          </span>
        </div>
      </div>
      <AvailabilityCalendar
        class="mt-2"
        popover
        :available-dates="collaborator?.availableDates"
        @schedule-experience="(date) => openCreateExperience()"
      />
    </div>
    <h2 class="fw-bold mt-5">Products</h2>
    <ProductList :products="filteredProducts" />
    <h2 class="fw-bold mt-5">Food Experiences</h2>
    <ExperienceList
      :experiences="filteredExperiences"
      clear-data
      @schedule="(data) => openCreateExperience(data)"
    />
  </div>
</template>

<style scoped>
.img-300 {
  width: 300px;
  height: 300px;
  min-width: 300px;
  min-height: 300px;
}
</style>

<script setup>
import { computed } from "vue";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import { useProductStore } from "@/stores/useProductStore";
import ProductList from "../components/ProductList.vue";
import AvailabilityCalendar from "../components/AvailabilityCalendar.vue";
import { capitalizeKebab } from "@/utils/functions";
import { useRoute } from "vue-router";

const route = useRoute();

const collaboratorStore = useCollaboratorStore();
const productStore = useProductStore();

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
</script>

<template>
  <div class="d-flex flex-column p-3">
    <div v-if="collaborator" class="d-flex flew-row">
      <div class="d-flex flex-column col-3">
        <img
          :src="collaborator.image"
          :alt="collaborator.name"
          class="img-fluid mb-3 object-fit-cover rounded"
          style="width: 300px; height: 300px"
        />
      </div>
      <div class="d-flex flex-column mx-4">
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
        :available-dates="collaborator?.availableDates"
        @schedule-experience="(date) => console.log(date)"
      />
    </div>
  </div>
</template>

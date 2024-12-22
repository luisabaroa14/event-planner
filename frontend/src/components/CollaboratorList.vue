<script setup>
import { capitalizeKebab } from "@/utils/functions";

const props = defineProps({
  title: String,
  collaborators: Array,
  gridLayout: Boolean,
});
</script>

<template>
  <div class="h-100 w-100">
    <div class="d-flex flex-row align-items-center">
      <h2 class="me-4">{{ title }}</h2>
    </div>
    <div v-if="collaborators?.length">
      <div class="w-100">
        <div :class="gridLayout ? 'row' : 'd-flex overflow-auto'">
          <div
            v-for="collaborator in collaborators"
            :key="collaborator.id"
            :class="
              gridLayout
                ? 'col-3 col-sm-6 col-md-4 col-lg-3 mb-4'
                : 'flex-shrink-0 p-2 w-25-lg-w-50-sm'
            "
            class="text-center"
          >
            <img
              :src="collaborator.image"
              :alt="collaborator.name"
              class="rounded-circle img-fluid mb-3 object-fit-cover"
              style="width: 150px; height: 150px"
            />
            <h5 class="fw-bold mb-3">{{ collaborator.name }}</h5>
            <div class="btn btn-primary">About Me</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

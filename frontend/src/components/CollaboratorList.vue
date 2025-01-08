<script setup>
const props = defineProps({
  title: String,
  collaborators: Array,
  gridLayout: Boolean,
});
</script>

<template>
  <div class="w-100">
    <div class="d-flex flex-row align-items-center">
      <h2 v-if="title" class="me-4">{{ title }}</h2>
    </div>
    <div v-if="collaborators?.length">
      <div class="w-100">
        <div :class="gridLayout ? 'row' : 'd-flex overflow-auto'">
          <div
            v-for="collaborator in collaborators"
            :key="collaborator.id"
            :class="
              gridLayout
                ? 'col-6 col-sm-3 mb-6'
                : 'flex-shrink-0 w-25-lg-w-50-sm p-2'
            "
            class="text-center"
          >
            <img
              :src="collaborator.image"
              :alt="collaborator.name"
              class="rounded-circle img-fluid img-sm-100-lg-200 mb-3 object-fit-cover"
            />
            <h5 class="fw-bold mb-3">{{ collaborator.name }}</h5>
            <h6 class="mb-3">{{ collaborator.brief }}</h6>
            <router-link
              :to="`/chefs/${collaborator.id}`"
              class="btn btn-primary"
            >
              About Me
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({ events: Array });

const scrollContainer = ref(null);

</script>

<template>
  <div class="w-100 mt-3">
    <div v-if="events?.length === 0" class="text-center">
      <p>Loading events...</p>
    </div>
    <div
      v-else
      class="scroll-container d-flex flex-row overflow-auto gap-4 rounded"
      ref="scrollContainer"
      @mouseenter="stopAutoScroll"
      @mouseleave="startAutoScroll"
    >
      <div v-for="event in events" :key="event.id" class="col-6 col-lg-4">
        <div class="card border-0">
          <img
            :src="event.img"
            class="rounded-top img-fluid object-fit-cover w-100"
            style="height: 30vh;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ event.name }}</h5>
            <p>{{ event.location }}</p>
            <p class="text-muted">{{ event.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0px 0px 14px -2px #bebebe;
  transition: 0.6s ease-in-out;
}

</style>

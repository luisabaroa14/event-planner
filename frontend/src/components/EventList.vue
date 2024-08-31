<script setup>
const props = defineProps({ title: String, events: Array });
</script>

<template>
  <div class="w-100 mt-3">
    <h4 class="my-3">{{ title }}</h4>
    <div v-if="events?.length === 0" class="text-center">
      <p>Loading events...</p>
    </div>
    <div
      v-else
      class="scroll-container d-flex flex-row overflow-auto gap-4 rounded"
    >
      <div v-for="event in events" :key="event.id" class="col-6 col-lg-4">
        <div class="card border-0">
          <img
            :src="event.image"
            class="rounded-top img-fluid object-fit-cover w-100"
            style="height: 30vh"
          />
          <div class="card-body">
            <h5 class="card-title">{{ event.name }}</h5>
            <p class="text-muted">{{ event.date.toDateString() }}</p>
            <p class="">{{ event.description }}</p>
            <div class="d-flex flex-row">
              <p class="col fs-5" style="font-weight: bold">
                {{ event.price }}$
              </p>
              <button type="button" class="btn btn-primary rounded-pill">
                View Event
              </button>
            </div>
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

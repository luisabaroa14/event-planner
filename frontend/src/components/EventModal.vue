<script setup>
import {  computed } from "vue";
import { useEventStore } from "@/stores/useEventStore";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import { capitalizeKebab } from "@/utils/functions";

const props = defineProps({
  eventId: {
    type: String,
    required: true,
  },
});

const eventStore = useEventStore();
const collaboratorStore = useCollaboratorStore();

const event = computed(() =>
  eventStore.events?.find((e) => e.id === props.eventId)
);

const collaborator = computed(() =>
  collaboratorStore.collaborators?.find(
    (c) => c.id === event.value?.collaboratorId
  )
);
</script>

<template>
  <div
    v-if="event"
    class="modal fade"
    tabindex="-1"
    :id="`event-${eventId}`"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ event.name || "Event Details" }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="event">
          <img
            :src="event.image"
            alt="Event Image"
            class="img-fluid w-100 rounded mb-3"
          />
          <p><strong>Location:</strong> {{ event.location }}</p>
          <p><strong>Description:</strong> {{ event.description }}</p>
          <p><strong>Price:</strong> ${{ event.price }}</p>
          <p v-if="collaborator">
            <strong>Chef:</strong> {{ collaborator.name }}
          </p>
          <p v-if="event?.tags?.length">
            <strong>Tags:</strong> 
            <div class="d-flex flex-wrap">
              <span
                v-for="tag in event.tags"
                :key="tag"
                class="badge bg-primary me-2 mb-2 d-flex align-items-center"
              >
                {{ capitalizeKebab(tag) }}
              </span>
            </div>
          </p>
          <p><strong>Date:</strong> {{ event.date.toDateString()  }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="eventStore.addToCart(eventId)" data-bs-dismiss="modal">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-body img {
  max-height: 200px;
  object-fit: cover;
}
</style>

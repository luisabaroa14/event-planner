<script setup>
import { computed } from "vue";
import EventList from "../components/EventList.vue";
import img from "@/assets/images/dinner.jpg";
import SocialIcons from "@/components/SocialIcons.vue";
import { useEventStore } from "@/stores/useEventStore";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import { useProductStore } from "@/stores/useProductStore";
import strings from "@/utils/strings";
import CollaboratorList from "../components/CollaboratorList.vue";

const eventStore = useEventStore();
const collaboratorStore = useCollaboratorStore();
const productStore = useProductStore();

const infoPills = computed(() => [
  { id: 1, title: "Events", value: eventStore.events?.length },
  { id: 2, title: "Chefs", value: collaboratorStore.collaborators?.length },
  { id: 3, title: "Products", value: productStore.products?.length },
  { id: 4, title: "Locations", value: 2 },
]);

const mixedImages = computed(() => {
  // Get image arrays from events and products
  const images = [
    ...(eventStore.events?.map((event) => event.image) || []),
    ...(productStore.products?.map((product) => product.image) || []),
  ];

  // Shuffle the combined array
  return images.sort(() => Math.random() - 0.5);
});
</script>

<template>
  <div class="d-flex flex-column overflow-auto">
    <div class="position-relative" style="height: 60vh">
      <div
        class="position-absolute w-100 h-100"
        :style="{
          background: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'opacity(0.4) blur(3px)',
          zIndex: -1,
        }"
      ></div>
      <div class="position-absolute top-50 start-0 translate-middle-y mx-6">
        <h1 class="fw-bold">{{ strings.title.toUpperCase() }}</h1>
        <span class="fs-6">{{ strings.homeSubtitle }} </span>
      </div>
    </div>

    <div class="h-100 mx-5">
      <CollaboratorList
        class="mt-7"
        title="CHEFS"
        :gridLayout="false"
        :collaborators="collaboratorStore.collaborators"
      />

      <hr class="mb-7" />

      <EventList title="EVENTS" :events="eventStore.events" class="mb-7" />

      <div class="container my-5">
        <div class="row row-cols-2 row-cols-sm-2 row-cols-md-4 g-4">
          <div
            v-for="pill in infoPills"
            :key="`pill-${pill.title}`"
            class="col d-flex justify-content-center position-relative hover-bounce"
          >
            <div
              class="rounded-pill position-absolute w-80 h-100"
              :style="{
                backgroundImage: 'url(' + mixedImages?.[pill.id] + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(25%) grayscale(100%)',
                zIndex: -1,
              }"
            ></div>
            <span
              class="badge rounded-pill w-100 d-flex flex-column align-items-center justify-content-center text-white"
            >
              <span class="fs-1">{{ pill.value }}</span>
              <p class="mt-2 fs-6">{{ pill.title }}</p>
            </span>
          </div>
        </div>
      </div>

      <hr />
      <SocialIcons class="w-50" />
    </div>
  </div>
</template>

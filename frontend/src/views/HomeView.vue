<script setup>
import { computed } from "vue";
import EventList from "../components/EventList.vue";
import img from "@/assets/images/chef.png";
import ImageGrid from "@/components/ImageGrid.vue";
import SocialIcons from "@/components/SocialIcons.vue";
import CardComponent from "@/components/CardComponent.vue";
import ProductsCarousel from "@/components/ProductsCarousel.vue";
import { useEventStore } from "@/stores/useEventStore";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import { useProductStore } from "@/stores/useProductStore";

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
  <div class="h-100 d-flex flex-column p-3">
    <div class="mt-5 mx-3">
      <div
        class="d-flex flex-row-lg-column-sm justify-content-center h-30 my-2"
      >
        <div
          class="d-flex flex-row align-items-center justify-content-center w-50-lg-w-100-sm pe-1 mb-2"
        >
          <img
            class="w-50 h-100 object-fit-cover"
            style="filter: drop-shadow(5px 5px 10px black)"
            :src="img"
          />
          <div class="ms-4">
            <h1 class="fw-bold">JOGA</h1>
            <h2 class="fs-4">Savor the Flavor: A Culinary Adventure Awaits!</h2>
          </div>
        </div>
        <div
          class="d-flex align-items-center justify-content-center w-50-lg-w-100-sm h-100 mb-2"
        >
          <ImageGrid
            :images="mixedImages"
            style="filter: drop-shadow(16px 16px 16px black)"
          />
        </div>
      </div>

      <CardComponent class="my-6 mx-3">
        <div class="my-2 p-2">
          <h2 class="text-center fw-bold">Who We Are</h2>
          <p class="text-center fs-5">
            We are a passionate team of food lovers dedicated to bringing
            together the best culinary experiences from around the world. Our
            mission is to create a platform where food enthusiasts can share,
            learn, and enjoy the diverse flavors and techniques that make food a
            universal language. Join us and be a part of this delicious journey!
          </p>
        </div>
      </CardComponent>

      <EventList title="Events" :events="eventStore.events" />

      <CardComponent class="my-6 mx-3">
        <div class="my-2 p-2">
          <h2 class="text-center fw-bold">History</h2>
          <p class="text-center fs-5">
            Established in 2010, our food events planner has grown from a small
            local gathering to a must-attend culinary festival. Each year,
            thousands of food enthusiasts join us to celebrate the art of
            cooking, tasting, and enjoying food. From gourmet chefs to home
            cooks, everyone finds something to savor at our events.
          </p>
        </div>
      </CardComponent>

      <div v-if="collaboratorStore.collaborators" class="mt-5">
        <ProductsCarousel
          :images="collaboratorStore.collaborators.map((chef) => chef.image)"
          :numberOfRows="1"
          :withSpace="true"
        />
      </div>

      <div class="d-flex flex-row justify-content-between w-100 my-5">
        <div
          v-for="pill in infoPills"
          :key="`pill-${pill.title}`"
          class="d-flex w-20 position-relative hover-bounce"
        >
          <div
            class="rounded-pill position-absolute top-0 start-0 w-100 h-100"
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
            <span class="display-4">{{ pill.value }}</span>
            <p class="mt-2 fs-5">{{ pill.title }}</p>
          </span>
        </div>
      </div>
      <hr />
      <SocialIcons class="w-50" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import img from "@/assets/images/dinner.jpg";
import SocialIcons from "@/components/SocialIcons.vue";
import { useExperienceStore } from "@/stores/useExperienceStore";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import { useProductStore } from "@/stores/useProductStore";
import CollaboratorList from "@/components/CollaboratorList.vue";
import CardComponent from "@/components/CardComponent.vue";
import ImageCarousel from "@/components/ImageCarousel.vue";
import strings from "@/utils/strings";

const experienceStore = useExperienceStore();
const collaboratorStore = useCollaboratorStore();
const productStore = useProductStore();

const router = useRouter();

const infoPills = computed(() => [
  { id: 1, title: "Experiences", value: experienceStore.experiences?.length },
  { id: 2, title: "Chefs", value: collaboratorStore.collaborators?.length },
  { id: 3, title: "Products", value: productStore.products?.length },
  { id: 4, title: "Locations", value: 2 },
]);

const mixedImages = computed(() => {
  // Get image arrays from events and products
  const images = [
    ...(experienceStore.experiences?.map((e) => e.image) || []),
    ...(productStore.products?.map((p) => p.image) || []),
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

      <hr class="mb-6" />

      <h2>EXPERIENCES</h2>
      <div class="w-100 mb-8" @click="() => router.push('/experiences')">
        <ImageCarousel
          v-if="experienceStore.experiences?.length"
          :images="experienceStore.experiences.map((e) => e.image)"
          :numberOfRows="1"
          :withSpace="false"
        />
      </div>

      <CardComponent class="my-6 mx-3">
        <div class="d-flex flex-column justify-content-center my-2 p-2">
          <h2 class="text-center fw-bold">Create Your Own Event</h2>
          <p class="text-center fs-6 mx-4">
            Personalize every detail to make your event unique and memorable.
            Choose from a wide range of options, from guest lists to location
            settings, ensuring your event reflects your style and vision
            perfectly.
          </p>
          <button
            class="btn btn-primary mx-auto"
            @click="router.push('/create-experience')"
          >
            Create Experience
          </button>
        </div>
      </CardComponent>

      <h2>PRODUCTS</h2>
      <div class="w-100 mb-8" @click="() => router.push('/products')">
        <ImageCarousel
          v-if="productStore.products?.length"
          :images="productStore.products.map((p) => p.image)"
          :numberOfRows="1"
          :withSpace="false"
        />
      </div>

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

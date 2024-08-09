<script setup>
import { ref } from "vue";
import { getChefs } from "@/utils/data";
import SocialIcons from "@/components/SocialIcons.vue";
import { Carousel, Slide } from "vue3-carousel";

const currentSlide = ref(0);
const chefs = getChefs();

function slideTo(id) {
  const index = chefs.findIndex((chef) => chef.id === id);
  if (index !== -1) {
    currentSlide.value = index;
  }
}

const breakpoints = ref({
  0: { itemsToShow: 2 },
  // 992px and up
  992: { itemsToShow: 4 },
});

const chefSocialIcons = ["instagram", "spotify"];
</script>

<template>
  <div class="h-100 d-flex flex-column p-3">
    <div class="mt-5 mx-3">
      <h1>Chefs</h1>
      <Carousel
        :items-to-show="1"
        :wrap-around="true"
        v-model="currentSlide"
        class="mt-2"
      >
        <Slide v-for="chef in chefs" :key="`main-chef-${chef.name}`">
          <div class="w-100">
            <div class="card border-0" style="height: 50vh">
              <div class="d-flex flex-row">
                <img
                  :src="chef.img"
                  class="rounded-start object-fit-cover w-50"
                  style="height: 50vh"
                />
                <div class="card-body d-flex flex-column w-50">
                  <h2 class="fw-bold mb-3">{{ chef.name }}</h2>
                  <p
                    class="text-muted flex-grow-1 mb-3"
                    style="font-size: 1rem; max-height: 100px; overflow-y: auto"
                  >
                    {{ chef.description }}
                  </p>
                  <div>
                    <span
                      v-for="cuisine in chef.cuisineTypes"
                      :key="cuisine"
                      class="badge rounded-pill bg-primary me-2"
                    >
                      {{ cuisine }}
                    </span>
                  </div>

                  <SocialIcons
                    :icon-names="chefSocialIcons"
                    color="var(--bs-dark)"
                    class="me-2"
                  />
                  <button
                    class="btn btn-primary w-100"
                    @click="slideTo(chef.id)"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      </Carousel>

      <Carousel
        :breakpoints="breakpoints"
        snap-align="start"
        :wrap-around="true"
        :autoplay="500"
        :transition="3000"
        class="my-3"
      >
        <Slide v-for="chef in chefs" :key="`thumbnails-${chef.name}`">
          <div class="w-80" @click="slideTo(chef.id)">
            <div class="card card-scale border-0">
              <img
                :src="chef.img"
                class="rounded object-fit-cover"
                style="height: 30vh"
              />
            </div>
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<style scoped>
.card-scale:hover {
  transform: scale(0.9);
  transition: transform 0.3s ease-in-out, z-index 0.3s ease-in-out;
}
</style>

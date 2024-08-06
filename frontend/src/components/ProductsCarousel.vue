<script setup>
import { computed } from "vue";
import { Carousel, Slide } from "vue3-carousel";

import { getDishes } from '../utils/data';

import "vue3-carousel/dist/carousel.css";

const dishes = getDishes();

const props = defineProps({
  numberOfRows: {
    type: Number,
    default: 2, 
  },
});

const groupedDishes = computed(() => {
  const chunkSize = Math.ceil(dishes.length / props.numberOfRows);
  return Array.from({ length: props.numberOfRows }, (_, i) =>
    dishes.slice(i * chunkSize, (i + 1) * chunkSize)
  );
});

</script>

<template>
  <div v-for="(dishGroup, index) in groupedDishes" :key="index">
    <Carousel
      :items-to-show="2.5"
      :autoplay="250"
      :transition="3000"
      :wrap-around="true"
      :dir="index % 2 === 0 ? 'ltr' : 'rtl'"
      :pauseAutoplayOnHover="true"
    >
      <Slide v-for="(dish) in dishGroup" :key="dish.id" class="pt-3">
        <div class="card-container">
            <div class="card position-relative">
              <img :src="dish.img" class="rounded-top d-block w-100" />
            </div>
          </div>
      </Slide>
    </Carousel>
  </div>
</template>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  grid-auto-flow: dense;
  grid-gap: 0; 
}

.card {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: 225px;
  box-shadow: 0px 0px 14px -2px #bebebe;
  transition: 0.6s ease-in-out;
}

.card img {
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  justify-self: center; 
  align-self: center; 
  border-radius: 10px 10px 0 0;
  box-sizing: border-box;
}

.card:hover {
  transform: scale(1.1);
}
</style>

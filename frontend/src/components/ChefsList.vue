<script setup>
import { ref } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import { getChefs } from "../utils/data";

import "vue3-carousel/dist/carousel.css";

const currentSlide = ref(0);
const chefs = ref(getChefs());

const slideTo = (val) => {
  currentSlide.value = val;
};
</script>

<template>
  <Carousel
    id="gallery"
    :items-to-show="1"
    :wrap-around="true"
    v-model="currentSlide"
  >
    <Slide v-for="(chef, index) in chefs" :key="index">
      <div class="carousel__card">
        <div class="row h-100">
          <div class="col-md-6 p-0 d-flex justify-content-center">
            <img :src="chef.img" class="h-50 w-100 carousel__image" />
          </div>
          <div class="col-md-6 p-0">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="display-1">{{ chef.name }}</h5>
                <p class="display-2">{{ chef.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  </Carousel>

  <Carousel
    id="thumbnails"
    :items-to-show="3"
    :wrap-around="true"
    v-model="currentSlide"
    ref="carousel"
  >
    <Slide v-for="(chef, index) in chefs" :key="index">
      <div class="carousel__item" @click="slideTo(index)">
        <h5 class="display-1">{{ chef.name }}</h5>
      </div>
    </Slide>
  </Carousel>
</template>

<style scoped>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__card {
  height: 70vh;
  width: 100%;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-size: 20px;
  border-radius: 8px;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.carousel__image {
  object-fit: cover;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.card {
  border-radius: 0 10px 10px 0;
}

.card-body {
  background-color: rgba(255, 255, 255, 0.842);
  padding: 20px;
}
</style>

<script setup>
import { ref, computed } from "vue";
import { Carousel, Slide } from "vue3-carousel";

const props = defineProps({
  images: {
    type: Array,
    default: [],
  },
  numberOfRows: {
    type: Number,
    default: 1,
  },
  withSpace: {
    type: Boolean,
    default: true,
  },
});

const breakpoints = ref({
  0: { itemsToShow: 2 },
  // 992px and up
  992: { itemsToShow: 5 },
});

const groupedImages = computed(() => {
  const chunkSize = Math.ceil(props.images.length / props.numberOfRows);
  return Array.from({ length: props.numberOfRows }, (_, i) =>
  props.images.slice(i * chunkSize, (i + 1) * chunkSize)
  );
});
</script>

<template>
  <div v-for="(imageGroup, index) in groupedImages" :key="index" class="mb-3">
    <Carousel
      :breakpoints="breakpoints"
      snap-align="start"
      :autoplay="2000"
      :transition="3000"
      :wrap-around="true"
      :dir="index % 2 === 0 ? 'ltr' : 'rtl'"
      :pauseAutoplayOnHover="true"
    >
      <Slide
        v-for="image in imageGroup"
        :key="image"
        class="pt-3"
        :style="{ padding: withSpace ? '15px' : '0px' }"
      >
        <div class="card border-0">
          <img :src="image" :class="{ rounded: withSpace }" />
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<style scoped>
/* .carousel__slide {
  padding: 15px;
} */

.card {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: 200px;
  transition: transform 0.6s ease-in-out, z-index 0.6s ease-in-out;
  border-radius: 20px;
}

.card img {
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card:hover {
  transform: scale(1.1);
}

.carousel__slide:hover {
  z-index: 1;
}
</style>

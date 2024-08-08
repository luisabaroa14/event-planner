<script setup>
import { defineProps } from "vue";

const props = defineProps({
  dishes: Array,
  categories: Array,
  activeCategoryId: Number,
});

const updateRating = (dish, rating) => {
  // Actualiza el rating del evento
  dish.rating = rating;
};
</script>

<template>
  <div class="w-100 mt-3">
    <div class="tab-content" style="overflow-x: hidden">
      <div v-if="props.dishes.length === 0" class="text-center">
        <p>Loading dishes...</p>
      </div>
      <div class="card-container" v-else>
        <div
          v-for="dish in props.dishes"
          :key="dish.id"
          class="card border-0"
        >
          <img :src="dish.img" class="rounded-top" />
          <button
            class="position-absolute btn btn-sm btn-black border border-dark btn-black-hover rounded-circle"
            style="top: 10px; right: 10px"
          >
            <i class="fa fa-heart"></i>
          </button>
          <div class="card-body">
            <h5 class="card-title">{{ dish.name }}</h5>
            <div class="rating">
              <button
                v-for="i in 5"
                :key="i"
                @click="updateRating(dish, i)"
                :class="{ active: i <= dish.rating }"
              >
                <i class="fa fa-star"></i>
              </button>
            </div>
            <p class="text-muted">{{ dish.description }}</p>
            <div class="container">
              <div class="row">
                <p class="col fs-5" style="font-weight: bold">
                  {{ dish.cost }}
                </p>
                <button
                  type="button"
                  class="col btn btn-black bg-white border border-dark btn-black-hover rounded-pill"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 14px -2px #bebebe;
  transition: 0.6s ease-in-out;
}

.card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.rating {
  display: flex;
  gap: 5px;
}

.rating button {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.rating button.active {
  color: #ffd700;
}

.rating button i {
  font-size: 18px;
}

.btn-black:hover {
  background-color: #27486e !important;
  color: white;
}

@media (max-width: 1200px) {
  .card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  products: Array,
  categories: Array,
  activeCategoryId: Number,
});

const updateRating = (product, rating) => {
  // Actualiza el rating del evento
  product.rating = rating;
};
</script>

<template>
  <div class="w-100 mt-3">
    <div class="tab-content" style="overflow-x: hidden">
      <div v-if="props.products?.length === 0" class="text-center">
        <p>Loading productes...</p>
      </div>
      <div class="card-container" v-else>
        <div
          v-for="product in props.products"
          :key="product.id"
          class="card border-0"
        >
          <img :src="product.image" class="rounded-top" />
          <button
            class="position-absolute btn btn-sm btn-black border border-dark btn-black-hover rounded-circle"
            style="top: 10px; right: 10px"
          >
            <i class="fa fa-heart"></i>
          </button>
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <div class="rating">
              <button
                v-for="i in 5"
                :key="i"
                @click="updateRating(product, i)"
                :class="{ active: i <= product.rating }"
              >
                <i class="fa fa-star"></i>
              </button>
            </div>
            <p class="text-muted">{{ product.description }}</p>
            <div class="container">
              <div class="row">
                <p class="col fs-5" style="font-weight: bold">
                  {{ product.price }}$
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

<script setup>
import { defineProps } from "vue";
import { capitalizeKebab } from "@/utils/functions";

const props = defineProps({
  products: Array,
});
</script>

<template>
  <div class="w-100 mt-3">
    <div class="tab-content" style="overflow-x: hidden">
      <div v-if="props.products?.length === 0" class="text-center">
        <p>Loading products...</p>
      </div>
      <div class="card-container" v-else>
        <div
          v-for="product in props.products"
          :key="product.id"
          class="card border-0 h-100"
        >
          <img :src="product.image" class="rounded-top" />
          <!-- <button
            class="position-absolute btn btn-sm btn-black border border-dark btn-black-hover rounded-circle"
            style="top: 10px; right: 10px"
          >
            <i class="fa fa-heart"></i>
          </button> -->
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <div class="d-flex flex-wrap">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="badge bg-primary me-2 mb-2 d-flex align-items-center"
              >
                {{ capitalizeKebab(tag) }}
              </span>
            </div>
            <p
              class="overflow-hidden elispe-text-3-lines m-0"
              style="max-height: 70px"
            >
              {{ product.description }}
            </p>
            <div
              class="d-flex flex-row align-items-center justify-content-between"
            >
              <p class="fs-5 m-0" style="font-weight: bold">
                {{ product.price }}$
              </p>
              <button type="button" class="btn btn-primary rounded-pill">
                Add to Cart
              </button>
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

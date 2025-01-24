<script setup>
import { capitalizeKebab } from "@/utils/functions";
import { useProductStore } from "@/stores/useProductStore";
import Empty from "@/assets/lottie/empty.json";

const props = defineProps({
  products: Array,
});

const productStore = useProductStore();
</script>

<template>
  <div class="w-100 mt-3">
    <div class="tab-content" style="overflow-x: hidden">
      <div v-if="!props.products?.length" class="mt-3">
        <Vue3Lottie :animationData="Empty" :height="400" />
      </div>
      <div v-else class="card-container">
        <div
          v-for="product in props.products"
          :key="product.id"
          class="card border-0 h-100"
        >
          <img :src="product.image" class="rounded-top" />
          <div class="card-body d-flex flex-column flex-grow-1 h-100">
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
              class="flex-grow-1 overflow-hidden elispe-text-3-lines m-0"
              style="max-height: 70px"
            >
              {{ product.description }}
            </p>
            <div
              class="d-flex flex-row align-items-center justify-content-between mt-auto"
            >
              <p class="fs-5 m-0 mt-1" style="font-weight: bold">
                {{ product.price }}$
              </p>
              <button
                type="button"
                class="btn btn-primary rounded-pill mt-1"
                @click="productStore.addToCart(product.id)"
              >
                Add
                <i class="fa fa-cart-shopping"></i>
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

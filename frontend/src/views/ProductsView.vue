<script setup>
import ProductList from "../components/ProductList.vue";
import ProductsCarousel from "@/components/ProductsCarousel.vue";
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/useProductStore";

const productStore = useProductStore();

const categories = ref([
  { id: 1, name: "Breakfast" },
  { id: 2, name: "Meal" },
  { id: 3, name: "Dinner" },
]);

const activeCategoryId = ref(0);

const activeName = ref("");

const filteredProducts = computed(() => {
  // if (activeCategoryId.value === 0) {
  //   return productStore.products;
  // }
  //  else {
  //   return productStore.products.filter((product) => product.categoryId === activeCategoryId.value);
  // }
});

const searchProducts = computed(() => {
  if (activeName.value === "") {
    return productStore.products;
  } else {
    return productStore.products.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(activeName.value.toLowerCase());
    });
  }
});

const updateRating = (productId, newRating) => {
  const productIndex = productStore.products.findIndex(
    (product) => product.id === productId
  );
  if (productIndex !== -1) {
    productStore.products[productIndex].rating = newRating;
  }
};
</script>

<template>
  <div class="h-100 d-flex flex-column p-3">
    <div class="mt-5 mx-3">
      <div
        class="d-flex justify-content-between align-items-center mb-3 flex-wrap"
      >
        <h1>Products</h1>
        <div class="d-flex ms-md-2 mt-md-0 mt-3">
          <input
            type="search"
            class="form-control"
            placeholder="Search products"
            v-model="activeName"
          />
          <div class="dropdown ms-2">
            <button
              class="btn btn-secondary dropdown-toggle bg-white"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Type of food
            </button>
            <ul
              class="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
              id="dropdownMenu"
            >
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent="activeCategoryId = 0"
                  >All</a
                >
              </li>
              <li v-for="category in categories" :key="category.id">
                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent="activeCategoryId = category.id"
                  >{{ category.name }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="productStore.products">
        <ProductList
          :products="searchProducts"
          :categories="categories"
          :active-category-id="activeCategoryId"
          @update-rating="updateRating"
        />
        <div class="my-5">
          <ProductsCarousel
            v-if="productStore.products"
            :images="productStore.products.map((p) => p.image)"
            :numberOfRows="1"
            :withSpace="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

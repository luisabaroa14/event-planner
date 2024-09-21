<script setup>
import ProductList from "../components/ProductList.vue";
import ProductsCarousel from "@/components/ProductsCarousel.vue";
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/useProductStore";
import { productsFilterTags } from "@/utils/tagGroups";
import { capitalizeKebab } from "@/utils/functions";

const productStore = useProductStore();

const selectedFilterTag = ref("all");

const activeName = ref("");

const filteredProducts = computed(() => {
  return productStore.products.filter((product) => {
    const matchesTag =
      selectedFilterTag.value === "all" ||
      product.tags.includes(selectedFilterTag.value);
    const matchesName =
      activeName.value === "" ||
      product.name.toLowerCase().includes(activeName.value.toLowerCase());

    return matchesTag && matchesName;
  });
});

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
              {{
                selectedFilterTag === "all"
                  ? "Type of food"
                  : capitalizeKebab(selectedFilterTag)
              }}
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
                  @click.prevent="selectedFilterTag = 'all'"
                  >All</a
                >
              </li>
              <li v-for="tag in productsFilterTags" :key="tag">
                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent="selectedFilterTag = tag"
                >
                  {{ capitalizeKebab(tag) }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="productStore.products">
        <ProductList :products="filteredProducts" />
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

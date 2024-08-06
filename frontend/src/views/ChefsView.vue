<script setup>
import ChefsList from '../components/ChefsList.vue';
import ProductsCarousel from '../components/ProductsCarousel.vue';

</script>

<template>
  <!-- Main container -->
  <div class="h-100 d-flex flex-column p-3">
    <!-- Header section -->
    <div class="mt-5 mx-3">
      <h1>Chefs</h1>
      <p>Welcome to the chefs page</p>
      <!-- Render the ProductsCarousel component -->
      <ChefsList/>
      <ProductsCarousel />
    </div>
  </div>
</template>


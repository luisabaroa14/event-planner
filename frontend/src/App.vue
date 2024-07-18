<script setup>
import { RouterView } from "vue-router";
import TopNavBar from "./components/TopNavBar.vue";
import BottomNavBar from "./components/BottomNavBar.vue";
</script>

<template>
  <div class="h-100">
    <TopNavBar />
    <RouterView />
    <BottomNavBar />
  </div>
</template>

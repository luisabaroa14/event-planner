<script setup>
import { RouterView } from "vue-router";
import TopNavBar from "./components/TopNavBar.vue";
</script>

<template>
  <div class="h-100">
    <TopNavBar />
    <RouterView style="margin-top: 70px" />
  </div>
</template>

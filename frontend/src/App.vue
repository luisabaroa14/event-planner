<script setup>
import { RouterView } from "vue-router";
import TopNavBar from "./components/TopNavBar.vue";
import Toast from "@/components/Toast.vue";
</script>

<template>
  <Toast />
  <div class="h-100">
    <TopNavBar />
    <RouterView style="margin-top: 70px" />
  </div>
</template>

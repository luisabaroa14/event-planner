<script setup>
import Empty from "@/assets/lottie/empty.json";
</script>

<template>
  <div
    class="d-flex text-center flex-column align-itmes-center justify-content-center w-100"
    style="height: 90vh"
  >
    <h1>Not Found</h1>
    <Vue3Lottie :animationData="Empty" :height="400" />
  </div>
</template>

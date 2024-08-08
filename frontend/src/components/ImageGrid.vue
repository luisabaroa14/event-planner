<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center w-100 h-100"
  >
    <div class="d-flex justify-content-center w-100 h-30">
      <img
        :src="images[0]"
        class="img-fluid object-fit-cover rounded-3 w-30 hover-bounce"
      />
    </div>
    <div class="d-flex flex-row w-100 justify-content-between h-30">
      <img
        :src="images[1]"
        class="img-fluid object-fit-cover rounded-3 w-30 hover-bounce"
      />
      <img
        :src="images[2]"
        class="img-fluid object-fit-cover rounded-3 w-30 hover-bounce"
      />
    </div>
    <div class="d-flex justify-content-center w-100 h-30">
      <img
        :src="images[3]"
        class="img-fluid object-fit-cover rounded-3 w-30 hover-bounce"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ images: Array });
</script>

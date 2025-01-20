<script setup>
import { toasts } from "@/utils/toast.js";
</script>

<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div
      v-for="msg in toasts.messages"
      :key="msg.id"
      class="toast show align-items-center text-white bg-primary border-0"
      role="alert"
    >
      <div class="d-flex">
        <div class="toast-body">{{ msg.message }}</div>
        <button
          type="button"
          class="btn-close btn-close-white me-3 m-auto"
          @click="toasts.remove(msg.id)"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

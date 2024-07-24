<template>
    <div class="w-100 mt-3">
      <div class="tab-content" style="overflow-x: hidden;">
        <div v-if="props.events.length === 0" class="text-center">
          <p>Loading events...</p>
        </div>
        <div class="card-container" v-else>
          <div v-for="event in props.events" :key="event.id" class="card">
            <img :src="event.img" class="rounded-top" />
            <div class="card-body">
              <h5 class="card-title">{{ event.name }}</h5>
              <p>{{ event.location }}</p>
              <p class="text-muted">{{ event.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps } from "vue";
  
  const props = defineProps({
    events: Array,
    categories: Array,
    activeCategoryId: Number
  });
  </script>
  
  <style scoped>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .card {
    width: calc(25% - 20px);
    margin: 10px 20px 10px 0;
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
  
  @media (max-width: 768px) {
    .card {
      width: calc(50% - 20px);
    }
  }
  
  @media (max-width: 480px) {
    .card {
      width: 100%;
    }
  }
  </style>
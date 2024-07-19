<template>
  <div class="w-100 mt-3">
    <div v-if="events.length === 0" class="text-center">
      <p>Loading events...</p>
    </div>
    <div
      v-else
      class="scroll-container d-flex flex-row overflow-auto gap-4 rounded"
      ref="scrollContainer"
      @mouseenter="stopAutoScroll"
      @mouseleave="startAutoScroll"
    >
      <div v-for="event in events" :key="event.id">
        <div class="card border-0">
          <img :src="img" class="rounded-top" />
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
import { ref, onMounted } from "vue";

const scrollContainer = ref(null);
let scrollInterval = null;

const events = ref([]);
const img =
  "https://cdn.pixabay.com/photo/2015/12/26/11/08/finger-food-1108565_1280.jpg";

const loadEvents = async () => {
  try {
    const response = await fetch("http://localhost:3300/api/events");
    events.value = await response.json();
  } catch (error) {
    console.error("Error loading events:", error);
  }
};

const startAutoScroll = () => {
  if (scrollInterval) return;
  scrollInterval = setInterval(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollLeft += 1;
    }
  }, 10);
};

const stopAutoScroll = () => {
  clearInterval(scrollInterval);
  scrollInterval = null;
};

onMounted(() => {
  // loadEvents();
  startAutoScroll();
  events.value = [
    {
      id: 1,
      name: "Event 1",
      date: "2022-01-01",
      location: "Location 1",
    },
    {
      id: 2,
      name: "Event 2",
      date: "2022-02-02",
      location: "Location 2",
    },
    {
      id: 3,
      name: "Event 3",
      date: "2022-03-03",
      location: "Location 3",
    },
    {
      id: 4,
      name: "Event 4",
      date: "2022-04-04",
      location: "Location 4",
    },
    {
      id: 5,
      name: "Event 5",
      date: "2022-05-05",
      location: "Location 5",
    },
    {
      id: 6,
      name: "Event 6",
      date: "2022-06-06",
      location: "Location 6",
    },
    {
      id: 7,
      name: "Event 7",
      date: "2022-07-07",
      location: "Location 7",
    },
    {
      id: 8,
      name: "Event 8",
      date: "2022-08-08",
      location: "Location 8",
    },
    {
      id: 9,
      name: "Event 9",
      date: "2022-09-09",
      location: "Location 9",
    },
    {
      id: 10,
      name: "Event 10",
      date: "2022-10-10",
      location: "Location 10",
    },
  ];
});
</script>

<style scoped>
.card {
  width: 280px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 14px -2px #bebebe;
  transition: 0.6s ease-in-out;
}

.scroll-container {
  white-space: nowrap; /* Ensures items are in a single line */
  scroll-behavior: smooth; /* Smooth scrolling behavior */
  overflow-x: hidden; /* Hide horizontal scrollbar */
  scrollbar-width: none; /* Firefox */
}

.scroll-container:hover {
  overflow-x: auto; /* Show horizontal scrollbar on hover */
  scrollbar-width: auto; /* Firefox */
}
</style>

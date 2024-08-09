<script setup>
import { computed } from "vue";
const icons = [
  { name: "instagram", url: "https://www.instagram.com" },
  { name: "spotify", url: "https://www.spotify.com" },
  { name: "facebook", url: "https://www.facebook.com" },
  { name: "whatsapp", url: "https://www.whatsapp.com" },
];

const filteredIcons = computed(() =>
  icons.filter((icon) => props.iconNames.includes(icon.name))
);

const props = defineProps({
  iconNames: {
    type: Array,
    default: () => ["instagram", "spotify", "facebook", "whatsapp"],
  },
  color: {
    type: String,
    default: "whitesmoke",
  },
});
</script>

<template>
  <div class="d-flex flex-row justify-content-center container p-3">
    <a
      v-for="icon in filteredIcons"
      :key="icon.name"
      :href="icon.url"
      class="fa-brands"
      :style="{ color: props.color }"
      :class="`${icon.name} fa-${icon.name}`"
    >
    </a>
  </div>
</template>

<style scoped>
.container {
  height: 100px;
}

.container .instagram,
.container .spotify,
.container .facebook,
.container .whatsapp {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  font-size: 28px;
  text-decoration: none;
  transition: 0.25s;
  border-radius: 50px;
}

/* Media query for screens smaller than 992px */
@media (max-width: 991.98px) {
  .container {
    height: 60px; /* Adjust height for smaller screens */
  }

  .container .instagram,
  .container .spotify,
  .container .facebook,
  .container .whatsapp {
    font-size: 18px; /* Adjust font size for smaller screens */
  }
}

.container .instagram:hover {
  background: #f09433;
  background: -moz-linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background: -webkit-linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
  animation: bounce 0.4s linear;
}

.container .spotify:hover {
  background-color: #1db954;
  animation: bounce 0.4s linear;
}

.container .facebook:hover {
  background-color: #316ff6;
  animation: bounce 0.4s linear;
}

.container .whatsapp:hover {
  background-color: #12a50b;
  animation: bounce 0.4s linear;
}
</style>

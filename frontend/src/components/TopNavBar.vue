<template>
  <div
    class="position-fixed d-flex justify-content-center align-items-center w-100 pt-3 pb-3 z-3"
    style="
      background: linear-gradient(to right, #769bba, var(--bs-secondary));
      mask-image: linear-gradient(black 80%, transparent);
    "
  >
    <nav class="navbar shadow-sm rounded-pill border p-0">
      <div class="justify-content-center">
        <ul class="nav gap-2">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              aria-current="page"
              to="/"
            >
              <i class="fas fa-house-chimney"></i>
              <!-- <i class="fas fa-home"></i> -->
              <p class="large-screen m-0">Home</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              aria-current="page"
              to="/events"
            >
              <i class="fas fa-champagne-glasses"></i>
              <!-- <i class="fas fa-calendar-alt"></i> -->
              <p class="large-screen m-0">Events</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              aria-current="page"
              to="/products"
            >
              <i class="fas fa-bowl-rice"></i>
              <p class="large-screen m-0">Products</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              aria-current="page"
              to="/chefs"
            >
              <ChefIcon />
              <!-- <i class="fas fa-bowl-rice"></i> -->
              <p class="large-screen m-0">Chefs</p>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup>
import ChefIcon from "@/assets/icons/ChefIcon.vue";
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  transition: all 0.6s ease;
}

.nav-link.active {
  background-color: #f8f9fa;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

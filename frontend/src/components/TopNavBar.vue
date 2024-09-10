<template>
  <div
    class="position-fixed d-flex justify-content-between align-items-center w-100 pt-3 pb-3 z-3 px-3 bl-btm"
    style="background: linear-gradient(to right, #769bba, var(--bs-secondary))"
  >
    <div class="d-flex">
      <img :src="icon" alt="logo" style="width: 50px" />
    </div>
    <div class="d-flex w-100 justify-content-center">
      <nav class="d-flex navbar shadow-sm rounded-pill border p-0">
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
            <!-- <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                aria-current="page"
                to="/admin"
              >
                <i class="fas fa-lock"></i>
                <p class="large-screen m-0">Admin</p>
              </router-link>
            </li> -->
          </ul>
        </div>
      </nav>
    </div>
    <div class="large-screen d-flex">
      <i class="fas fa-user-circle fa-2x"></i>
    </div>
  </div>
</template>

<script setup>
import ChefIcon from "@/assets/icons/ChefIcon.vue";
import icon from "@/assets/images/icon.png";
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

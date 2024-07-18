<template>
  <nav class="navbar fixed-bottom bg-light small-screen shadow-sm p-0">
    <div class="container-fluid p-0">
      <ul class="nav w-100">
        <li class="nav-item flex-grow-1">
          <router-link
            class="nav-link d-flex flex-column"
            active-class="active"
            aria-current="page"
            to="/"
          >
            <i class="fas fa-house-chimney"></i>
            Home
          </router-link>
        </li>
        <li class="nav-item flex-grow-1">
          <router-link
            class="nav-link d-flex flex-column"
            active-class="active"
            aria-current="page"
            to="/events"
          >
            <i class="fas fa-champagne-glasses"></i> Events
            <!-- <i class="fas fa-calendar-days"></i> Events -->
          </router-link>
        </li>
        <li class="nav-item flex-grow-1">
          <router-link
            class="nav-link d-flex flex-column"
            active-class="active"
            aria-current="page"
            to="/products"
          >
            <i class="fas fa-bowl-rice"></i>
            Products
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  transition: all 0.6s ease;
}

.nav-link.active {
  color: white;
  background-color: var(--bs-primary);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

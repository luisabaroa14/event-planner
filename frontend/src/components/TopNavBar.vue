<script setup>
import { computed } from "vue";
import ChefIcon from "@/assets/icons/ChefIcon.vue";
import icon from "@/assets/images/icon.png";
import { useExperienceStore } from "@/stores/useExperienceStore";
import { useProductStore } from "@/stores/useProductStore";
import { useRouter } from "vue-router";
import strings from "@/utils/strings";

const experienceStore = useExperienceStore();
const productsStore = useProductStore();

const totalItems = computed(() => {
  const productCount = productsStore.cartProductIds?.length || 0;
  const experienceCount =
    experienceStore.cartCustomExperiences?.flatMap((e) => e.experienceIds)
      .length || 0;

  return productCount + experienceCount;
});

const router = useRouter();
</script>

<template>
  <div
    class="position-fixed d-flex justify-content-between align-items-center w-100 pt-3 pb-3 z-3 px-3 bl-btm"
    style="background: linear-gradient(to right, #769bba, var(--bs-secondary))"
  >
    <div class="d-flex">
      <img :src="icon" alt="logo" role="button" style="width: 50px" />
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
                <p class="large-screen m-0">{{ strings.home }}</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                aria-current="page"
                to="/experiences"
              >
                <i class="fas fa-champagne-glasses"></i>
                <p class="large-screen m-0">{{ strings.experiences }}</p>
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
                <p class="large-screen m-0">{{ strings.products }}</p>
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
                <p class="large-screen m-0">{{ strings.chefs }}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="d-flex">
      <div class="position-relative" role="button">
        <i
          class="fas fa-cart-shopping fs-3 text-primary me-2"
          @click="router.push('/cart')"
        ></i>
        <span
          v-if="totalItems"
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
          {{ totalItems }}
        </span>
      </div>
    </div>
  </div>
</template>

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

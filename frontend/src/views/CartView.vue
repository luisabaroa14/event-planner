<script setup>
import { useExperienceStore } from "@/stores/useExperienceStore";
import { useProductStore } from "@/stores/useProductStore";
import { useOrderStore } from "@/stores/useOrderStore";
import axios from "axios";
import { ref, computed } from "vue";
import CartModal from "@/components/CartModal.vue";
import ReviewExperience from "@/components/ReviewExperience.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import Empty from "@/assets/lottie/empty.json";
import strings from "@/utils/strings";
import { formatNumber } from "@/utils/functions";
import { toasts } from "@/utils/toast.js";

const experienceStore = useExperienceStore();
const productsStore = useProductStore();
const orderStore = useOrderStore();

const confirmModal = ref(null);

const itemsTotal = computed(() => {
  const cartItems = [
    { items: productsStore.cartProducts, quantities: productsStore.quantities },
  ];

  return cartItems.reduce((acc, store) => {
    return (
      acc +
      store.items.reduce((storeAcc, item) => {
        const quantity = store.quantities?.[item.id] || 0;
        return storeAcc + item.price * quantity;
      }, 0)
    );
  }, 0);
});

const experiencesTotal = computed(() => {
  const customExperiences = experienceStore.cartCustomExperiences || [];

  return customExperiences.reduce((total, customExperience) => {
    const guests = customExperience.guests || 0;

    const experienceTotal = customExperience.experienceIds.reduce((sum, id) => {
      const experience = experienceStore.experiences.find(
        (exp) => exp.id === id
      );
      if (!experience) return sum;

      const fee =
        guests < (experience.participants?.min || 0)
          ? experience.participants?.fee || 0
          : 0;

      return sum + Number(experience.price) * guests + fee;
    }, 0);

    return total + experienceTotal;
  }, 0);
});

const cart = computed(() => {
  const products = productsStore.quantities;
  const customExperiences = experienceStore.cartCustomExperiences;

  // If there are no products or custom experiences in the cart return null
  if (
    !customExperiences.length &&
    (!products || Object.keys(products).length === 0)
  ) {
    return null;
  }

  return {
    products,
    customExperiences,
  };
});

const handleConfirm = async (userData) => {
  // Get user details from userData
  const { name, email, phone } = userData;

  if (!name || !email || !phone) {
    toasts.show(strings.missingData);
    return;
  }

  // Return if the cart is empty
  if (!cart.value) return;

  const response = await orderStore.createOrder({
    userData: {
      name,
      email,
      phone,
    },
    ...cart.value,
    experiencesTotal: experiencesTotal.value,
    itemsTotal: itemsTotal.value,
    total: experiencesTotal.value + itemsTotal.value,
  });

  if (response) {
    productsStore.clearCart();
    experienceStore.clearCart();
  }
};

const deleteProduct = (productId) => {
  confirmModal.value.showModal(
    strings.confirmDelete,
    strings.confirmDeleteSubtitle,
    () => productsStore.removeFromCart(productId)
  );
};
</script>

<template>
  <div class="d-flex flex-column mt-5 mx-3 p-3">
    <div v-if="cart">
      <div v-if="productsStore.cartProducts?.length" class="mt-4">
        <div class="table-responsive rounded">
          <table class="table mb-0">
            <thead>
              <tr>
                <th scope="col">{{ strings.products }}</th>
                <th scope="col" class="text-center">{{ strings.quantity }}</th>
                <th scope="col" class="text-center">{{ strings.price }}</th>
                <th scope="col" class="text-center">{{ strings.remove }}</th>
              </tr>
            </thead>
            <tbody class="rounded">
              <tr
                v-for="product in productsStore.cartProducts"
                :key="product.id"
                class="align-middle"
              >
                <td>
                  <div class="d-flex flex-row align-items-center">
                    <img
                      :src="product.image"
                      class="rounded-circle"
                      style="width: 100px; height: 100px; object-fit: cover"
                      alt="Event Image"
                    />
                    <span class="fw-bold ms-3">{{ product.name }}</span>
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-content-center align-items-center">
                    <button
                      class="btn btn-primary d-flex justify-content-center align-items-center circle-btn fs-4"
                      @click="productsStore.decrementQuantity(product.id)"
                    >
                      -
                    </button>
                    <span class="fs-5 mx-4">{{
                      productsStore.quantities[product.id]
                    }}</span>
                    <button
                      class="btn btn-primary d-flex justify-content-center align-items-center circle-btn fs-4"
                      @click="
                        productsStore.quantities[product.id] =
                          productsStore.quantities[product.id] + 1
                      "
                    >
                      +
                    </button>
                  </div>
                </td>
                <td class="fs-5 fw-bold text-center">
                  ${{
                    formatNumber(
                      product.price * productsStore.quantities?.[product.id]
                    )
                  }}
                </td>
                <td class="text-center">
                  <i
                    role="button"
                    class="fas fa-trash fs-5 text-primary"
                    @click="deleteProduct(product.id)"
                  >
                  </i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 class="fw-bold mt-4">
          {{ strings.subtotal }}: ${{ formatNumber(itemsTotal) }}
        </h4>
        <hr />
      </div>

      <div v-if="experienceStore.cartCustomExperiences?.length">
        <ReviewExperience />
        <h4 class="fw-bold">
          {{ strings.subtotal }}: ${{ formatNumber(experiencesTotal) }}
        </h4>
        <hr />
      </div>

      <h3 class="fw-bold mt-2">
        {{ strings.total }}: ${{ formatNumber(experiencesTotal + itemsTotal) }}
      </h3>
      <button
        data-bs-toggle="modal"
        data-bs-target="#cart-modal"
        class="btn btn-primary mt-4"
      >
        {{ strings.confirm }}
      </button>
      <CartModal @confirm="handleConfirm" />
      <ConfirmModal ref="confirmModal" />
    </div>
    <div
      v-else
      class="d-flex flex-column align-items-center justify-content-center w-100"
    >
      <h1 class="mt-4">{{ strings.emptyCartMessage }}</h1>
      <Vue3Lottie :animationData="Empty" :height="400" />
    </div>
  </div>
</template>

<style scoped>
.circle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>

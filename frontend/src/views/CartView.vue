<script setup>
import { useEventStore } from "@/stores/useEventStore";
import { useProductStore } from "@/stores/useProductStore";
import axios from "axios";

const eventStore = useEventStore();
const productsStore = useProductStore();

const sendEmail = async () => {
  const sbj = encodeURIComponent("Subject Example");
  const message = encodeURIComponent("This is the cart text example");

  try {
    const response = await axios.get(
      `/mail.php?sbj=${sbj}&message=${message}`
    );
    console.log(response.data); // You can handle success response here
  } catch (error) {
    console.error("Failed to send email", error);
  }
};
</script>

<template>
  <div class="d-flex flex-column mt-5 mx-3 p-3">
    <h2 class="mb-4">Your Cart</h2>

    <!-- <div v-if="eventStore.cartEvents?.length" class="mb-5">
      <h3>Events</h3>
      <div class="d-flex flex-column overflow-auto">
        <div
          class="card flex-row mx-2 w-100 my-1"
          v-for="event in eventStore.cartEvents"
          :key="event.id"
        >
          <img
            :src="event.image"
            class="rounded-start object-fit-cover w-20"
            style="height: 200px"
            alt="Event Image"
          />
          <div class="card-body">
            <div>
              <h5 class="card-title">{{ event.name }}</h5>
              <p class="text-muted">{{ event.date.toDateString() }}</p>
            </div>
            <p class="card-text">Price: ${{ event.price }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="productsStore.cartProducts?.length">
      <h3>Products</h3>
      <div class="d-flex overflow-auto">
        <div
          class="card mx-2"
          v-for="product in productsStore.cartProducts"
          :key="product.id"
          style="min-width: 18rem"
        >
          <img :src="product.image" class="card-img-top" alt="Product Image" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">Price: ${{ product.price }}</p>
          </div>
        </div>
      </div>
    </div> -->
    <button @click="sendEmail" class="btn btn-primary mt-4">Send Email</button>
  </div>
</template>

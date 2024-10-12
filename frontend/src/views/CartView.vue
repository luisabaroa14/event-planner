<script setup>
import { useEventStore } from "@/stores/useEventStore";
import { useProductStore } from "@/stores/useProductStore";
import axios from "axios";
import { computed } from "vue";
import CartModal from "@/components/CartModal.vue";

const eventStore = useEventStore();
const productsStore = useProductStore();

const total = computed(() => {
  const cartItems = [
    { items: eventStore.cartEvents, quantities: eventStore.quantities },
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

const sendEmail = async (subject, body) => {
  const sbj = encodeURIComponent(subject);
  const message = encodeURIComponent(body);

  try {
    const response = await axios.get(`/mail.php?sbj=${sbj}&message=${message}`);
  } catch (error) {
    console.error("Failed to send email", error);
  }
};

const handleConfirm = (userData) => {
  // Get user details from userData
  const { name, email, phone } = userData;

  // Get the products in the cart
  const cartItems = [...eventStore.cartEvents, ...productsStore.cartProducts];

  // Get the quantities of each product
  const quantities = { ...eventStore.quantities, ...productsStore.quantities };

  // Create the email content
  let productDetails = cartItems
    .map((item) => {
      const quantity = quantities[item.id] || 0; // Get the quantity for each product
      const price = item.price; // Assuming price is a number
      return `- ${item.name}: ${quantity} x $${price}`;
    })
    .join("\n");

  // Calculate total and format it
  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * (quantities[item.id] || 0);
  }, 0);

  // Construct the email body
  const emailBody =
    `Dear ${name},\n\n` +
    `Thank you for your purchase! Below are the details of your order:\n\n` +
    `${productDetails}\n\n` +
    `Total: $${total}\n\n` +
    `Your contact details are as follows:\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n\n` +
    `Thank you for shopping with us! If you have any questions, feel free to contact us.`;

    sendEmail("Order Confirmation", emailBody);
};
</script>

<template>
  <div class="d-flex flex-column mt-5 mx-3 p-3">
    <h2 class="mb-4">Your Cart</h2>

    <div v-if="eventStore.cartEvents?.length" class="mb-4">
      <div class="table-responsive rounded">
        <table class="table mb-0">
          <thead>
            <tr>
              <th scope="col">Event</th>
              <th scope="col">Date</th>
              <th scope="col" class="text-center">Quantity</th>
              <th scope="col" class="text-center">Remove</th>
              <th scope="col" class="text-center">Price</th>
            </tr>
          </thead>
          <tbody class="rounded">
            <tr
              v-for="event in eventStore.cartEvents"
              :key="event.id"
              class="align-middle"
            >
              <td>
                <div class="d-flex flex-row align-items-center">
                  <img
                    :src="event.image"
                    class="rounded-circle"
                    style="width: 100px; height: 100px; object-fit: cover"
                    alt="Event Image"
                  />
                  <span class="fw-bold ms-3">{{ event.name }}</span>
                </div>
              </td>
              <td style="min-width: 100px">{{ event.date.toDateString() }}</td>
              <td>
                <div class="d-flex justify-content-center align-items-center">
                  <button
                    class="btn btn-primary d-flex justify-content-center align-items-center circle-btn fs-4"
                    @click="eventStore.decrementQuantity(event.id)"
                  >
                    -
                  </button>
                  <span class="fs-5 mx-4">{{
                    eventStore.quantities[event.id]
                  }}</span>
                  <button
                    class="btn btn-primary d-flex justify-content-center align-items-center circle-btn fs-4"
                    @click="
                      eventStore.quantities[event.id] =
                        eventStore.quantities[event.id] + 1
                    "
                  >
                    +
                  </button>
                </div>
              </td>
              <td class="text-center">
                <i
                  class="fas fa-trash fs-5 text-primary"
                  @click="eventStore.removeFromCart(event.id)"
                >
                </i>
              </td>
              <td class="fs-5 fw-bold text-center">
                ${{ event.price * eventStore.quantities[event.id] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="productsStore.cartProducts?.length" class="mb-4">
      <div class="table-responsive rounded">
        <table class="table mb-0">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col" class="text-center">Quantity</th>
              <th scope="col" class="text-center">Remove</th>
              <th scope="col" class="text-center">Price</th>
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
              <td class="text-center">
                <i
                  class="fas fa-trash fs-5 text-primary"
                  @click="[productsStore.removeFromCart(product.id)]"
                >
                </i>
              </td>
              <td class="fs-5 fw-bold text-center">
                ${{ product.price * productsStore.quantities[product.id] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <h3 class="fw-bold">Total: ${{ total }}</h3>
    <button
      data-bs-toggle="modal"
      data-bs-target="#cart-modal"
      class="btn btn-primary mt-4"
    >
      Confirm
    </button>
  </div>
  <CartModal @confirm="handleConfirm" />
</template>

<style scoped>
.circle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>

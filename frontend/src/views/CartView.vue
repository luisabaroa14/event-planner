<script setup>
// import { useEventStore } from "@/stores/useEventStore";
import { useExperienceStore } from "@/stores/useExperienceStore";
import { useProductStore } from "@/stores/useProductStore";
import axios from "axios";
import { computed } from "vue";
import CartModal from "@/components/CartModal.vue";
import ReviewExperience from "@/components/ReviewExperience.vue";
import strings from "@/utils/strings";
import { formatNumber } from "@/utils/functions";

// const eventStore = useEventStore();
const experienceStore = useExperienceStore();
const productsStore = useProductStore();

const total = computed(() => {
  const cartItems = [
    // { items: eventStore.cartEvents, quantities: eventStore.quantities },
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

// const experiencesTotal = computed(() => {
//   const customExperiences = experienceStore.cartCustomExperiences || [];

//   /// For each custom experience, calculate the total price of each experiece and consider the fee is the participants min is lower than it's guests
// });

const experiencesTotal = computed(() => {
  const customExperiences = experienceStore.cartCustomExperiences || [];

  const x = customExperiences.reduce((total, customExperience) => {
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

  return x;
});

const sendEmail = async (subject, body) => {
  const sbj = encodeURIComponent(subject);
  const message = encodeURIComponent(body);

  console.log(`/mail.php?sbj=${sbj}&message=${message}`);

  try {
    const response = await axios.get(`/mail.php?sbj=${sbj}&message=${message}`);
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Failed to send email", error);
  }
};

const handleConfirm = (userData) => {
  // Get user details from userData
  const { name, email, phone } = userData;

  // Get the products in the cart
  const cartItems = [...productsStore.cartProducts];

  // Get the quantities of each product
  const quantities = { ...productsStore.quantities };

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
    <!-- <div v-if="eventStore.cartEvents?.length" class="mb-4">
      <div class="table-responsive rounded">
        <table class="table mb-0">
          <thead>
            <tr>
              <th scope="col">{{ strings.event }}</th>
              <th scope="col">{{ strings.date }}</th>
              <th scope="col" class="text-center">{{ strings.quantity }}</th>
              <th scope="col" class="text-center">{{ strings.remove }}</th>
              <th scope="col" class="text-center">{{ strings.price }}</th>
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
    </div> -->

    <div v-if="productsStore.cartProducts?.length" class="my-4">
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
                  class="fas fa-trash fs-5 text-primary"
                  @click="[productsStore.removeFromCart(product.id)]"
                >
                </i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h4 class="fw-bold">{{ strings.subtotal }}: ${{ formatNumber(total) }}</h4>
    <hr />

    <div v-if="experienceStore.cartCustomExperiences?.length">
      <ReviewExperience />
    </div>

    <h4 class="fw-bold">
      {{ strings.subtotal }}: ${{ formatNumber(experiencesTotal) }}
    </h4>
    <hr />
    <h3 class="fw-bold mt-1">
      {{ strings.total }}: ${{ formatNumber(experiencesTotal + total) }}
    </h3>
    <button
      data-bs-toggle="modal"
      data-bs-target="#cart-modal"
      class="btn btn-primary mt-4"
    >
      {{ strings.confirm }}
    </button>
    <CartModal @confirm="handleConfirm" />
  </div>
</template>

<style scoped>
.circle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>

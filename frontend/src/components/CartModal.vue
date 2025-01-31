<template>
  <div class="modal fade" tabindex="-1" id="cart-modal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ strings.confirmPurchase }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            :aria-label="strings.close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="confirm">
            <div class="form-group mb-3">
              <label for="name">{{ strings.name }}</label>
              <input
                type="text"
                v-model="name"
                id="name"
                required
                class="form-control"
              />
            </div>

            <div class="form-group mb-3">
              <label for="email">{{ strings.email }}</label>
              <input
                type="email"
                v-model="email"
                id="email"
                required
                class="form-control"
              />
            </div>

            <div class="form-group mb-3">
              <label for="phone">{{ strings.phone }}</label>
              <input
                type="tel"
                v-model="phone"
                id="phone"
                required
                class="form-control"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            {{ strings.close }}
          </button>
          <button
            type="submit"
            data-bs-dismiss="modal"
            class="btn btn-primary"
            @click="confirm"
          >
            {{ strings.confirm }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import strings from "@/utils/strings";

const emit = defineEmits(["confirm"]);

const name = ref("");
const email = ref("");
const phone = ref("");

const confirm = () => {
  // Emit the confirmation data to the parent component
  emit("confirm", { name: name.value, email: email.value, phone: phone.value });

  // Reset the values
  name.value = "";
  email.value = "";
  phone.value = "";
};
</script>

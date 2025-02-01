<script setup>
import { ref } from "vue";
import { Modal } from "bootstrap";
import strings from "@/utils/strings";

const title = ref("");
const subtitle = ref("");
const onConfirm = ref(null);
const modal = ref(null);

// Expose the showModal method to the parent
defineExpose({
  showModal(newTitle, newSubtitle, confirmCallback) {
    title.value = newTitle;
    subtitle.value = newSubtitle;
    onConfirm.value = confirmCallback;

    modal.value = new Modal(document.getElementById("confirmModal"));
    modal.value.show();
  },
});

const confirmAction = () => {
  if (onConfirm.value) {
    onConfirm.value();
  }

  modal.value.hide();
};
</script>

<template>
  <div
    class="modal fade"
    id="confirmModal"
    tabindex="-1"
    aria-labelledby="confirmModalLabel"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmModalLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{ subtitle }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            {{ strings.cancel }}
          </button>
          <button type="button" class="btn btn-primary" @click="confirmAction">
            {{ strings.confirm }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

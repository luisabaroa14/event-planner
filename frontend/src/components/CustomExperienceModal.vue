<script setup>
import { computed } from "vue";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import { capitalizeKebab } from "@/utils/functions";
import strings from "@/utils/strings";
import dayjs from "dayjs";

const props = defineProps({
  experienceData: {
    type: Object,
    required: true,
  },
});

const collaboratorStore = useCollaboratorStore();

const collaborator = computed(() =>
  collaboratorStore.collaborators?.find(
    (c) => c.id === props.experienceData.experience?.collaboratorId
  )
);
</script>

<template>
  <div
    v-if="experienceData.experience"
    class="modal fade"
    tabindex="-1"
    :id="`custom-experience-${
      experienceData.customExperience?.timestamp ?? 0
    }-${experienceData.experience.id}`"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ experienceData.experience.name || strings.details }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img
            :src="experienceData.experience.image"
            alt="Experience Image"
            class="img-fluid w-100 rounded mb-3"
          />
          <p>
            <strong>{{ strings.date }}:</strong>
            {{
              dayjs(experienceData.customExperience.date).format("DD MMM YYYY")
            }}
          </p>
          <p>
            <strong>
              {{ strings.price }}: ${{ experienceData.experience.price }}
              p/p
            </strong>
          </p>
          <span
            v-if="
              experienceData.customExperience.guests <
              experienceData.experience.participants.min
            "
            class="d-block text-danger mb-3 mt-1"
          >
            *{{ strings.minParticipantsForEvent }}
            <strong>{{ experienceData.experience.participants.min }}</strong
            >.
            <br />
            {{ strings.extraFeeMessage }}
            <strong>{{ experienceData.experience.participants.fee }}$</strong>.
            <br />
          </span>

          <p v-if="collaborator">
            <strong>{{ strings.chef }}:</strong> {{ collaborator.name }}
          </p>
          <p>
            <strong>{{ strings.location }}:</strong>
            {{ experienceData.customExperience.location }}
          </p>
          <p>
            <strong>{{ strings.comments }}:</strong>
            {{ experienceData.customExperience.comments }}
          </p>
          <p v-if="experienceData.experience?.tags?.length">
            <strong>Tags:</strong>
            <span class="d-flex flex-wrap">
              <span
                v-for="tag in experienceData.experience?.tags"
                :key="tag"
                class="badge bg-primary me-2 mb-2 d-flex align-items-center"
              >
                {{ capitalizeKebab(tag) }}
              </span>
            </span>
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            {{ strings.close }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-body img {
  max-height: 200px;
  object-fit: cover;
}
</style>

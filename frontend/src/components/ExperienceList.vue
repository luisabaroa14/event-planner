<script setup>
import { capitalizeKebab } from "@/utils/functions";
import { useExperienceStore } from "@/stores/useExperienceStore";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import Empty from "@/assets/lottie/empty.json";

const props = defineProps({
  experiences: Array,
  clearData: Boolean,
  collaboratorName: Boolean,
});
const emit = defineEmits(["schedule"]);

const experienceStore = useExperienceStore();
const collaboratorStore = useCollaboratorStore();

const handleScheduleClick = (experienceId, remove = false) => {
  if (remove) {
    experienceStore.removeExperience(experienceId);
  } else {
    if (props.clearData) experienceStore.clearSelectedData();
    experienceStore.addExperience(experienceId);
  }

  emit("schedule", remove);
};

const collaboratorName = (collaboratorId) => {
  const collaborator = collaboratorStore.getCollaboratorById(collaboratorId);
  return collaborator?.name ?? "";
};
</script>

<template>
  <div class="w-100 mt-3">
    <div class="tab-content" style="overflow-x: hidden">
      <div v-if="!props.experiences?.length" class="mt-3">
        <Vue3Lottie :animationData="Empty" :height="400" />
      </div>
      <div class="card-container" v-else>
        <div
          v-for="experience in props.experiences"
          :key="experience.id"
          class="card border-0 h-100"
        >
          <img :src="experience.image" class="rounded-top" />
          <button
            v-if="experience.participants?.min"
            class="position-absolute d-flex justify-content-center align-items-center btn btn-sm btn-primary"
            :title="`Minimum participants: ${experience.participants.min}`"
            style="top: 10px; right: 10px; height: 25px"
          >
            <i class="fa fa-user-plus fs-7"></i>
            <span class="fw-bold ms-1">{{ experience.participants.min }}</span>
          </button>
          <div class="card-body d-flex flex-column flex-grow-1 h-100">
            <h5 class="card-title">{{ experience.name }}</h5>
            <p class="fs-6 mb-2 text-muted">
              {{ collaboratorName(experience.collaboratorId) }}
            </p>
            <div class="d-flex flex-wrap">
              <span
                v-for="tag in experience.tags"
                :key="tag"
                class="badge bg-primary me-2 mb-2 d-flex align-items-center"
              >
                {{ capitalizeKebab(tag) }}
              </span>
            </div>
            <p
              class="flex-grow-1 overflow-hidden elispe-text-3-lines m-0"
              style="max-height: 70px"
            >
              {{ experience.description }}
            </p>
            <div
              class="d-flex flex-row align-items-center justify-content-between mt-auto"
            >
              <p class="fs-5 m-0 mt-1" style="font-weight: bold">
                {{ experience.price }}$ pp
              </p>
              <button
                v-if="
                  experienceStore.customExperience?.experienceIds?.includes(
                    experience.id
                  )
                "
                type="button"
                class="btn btn-warning rounded-pill mt-1"
                @click="handleScheduleClick(experience.id, true)"
              >
                <!-- Text visible on larger screens -->
                <span class="d-none d-sm-inline me-2">Remove</span>
                <!-- Icon visible on smaller screens -->
                <i class="fa fa-times"></i>
              </button>
              <button
                v-else
                type="button"
                class="btn btn-primary rounded-pill mt-1"
                @click="handleScheduleClick(experience.id)"
              >
                <!-- Text visible on larger screens -->
                <span class="d-none d-sm-inline me-2">Schedule</span>
                <!-- Icon visible on smaller screens -->
                <i class="fas fa-calendar-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 14px -2px #bebebe;
  transition: 0.6s ease-in-out;
}

.card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

@media (max-width: 1200px) {
  .card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

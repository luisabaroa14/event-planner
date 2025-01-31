<script setup>
import { computed } from "vue";
import strings from "@/utils/strings";
import { capitalizeFirstLetter } from "@/utils/functions";
import { useExperienceStore } from "@/stores/useExperienceStore";
import CustomExperienceModal from "./CustomExperienceModal.vue";
import dayjs from "dayjs";

const props = defineProps({
  currentExperience: { type: Boolean, default: false },
});

const experienceStore = useExperienceStore();

const customExperiences = computed(() => {
  const experienceIds = props.currentExperience
    ? experienceStore.customExperience.experienceIds
    : [];

  return experienceIds.map((id) => {
    const experience = experienceStore.experiences.find((exp) => exp.id === id);
    const customExperience = props.currentExperience
      ? experienceStore.customExperience
      : null;

    const fee =
      customExperience.guests < experience.participants?.min
        ? experience.participants?.fee
        : 0;

    return {
      experience: experience,
      customExperience: customExperience,
      fee: fee,
    };
  });
});
</script>

<template>
  <div class="mt-3 mb-4">
    <div class="table-responsive w-100 rounded">
      <table class="table mb-0">
        <thead>
          <tr>
            <th scope="col">{{ strings.experiences }}</th>
            <th scope="col" class="text-center">{{ strings.participants }}</th>
            <th scope="col" class="text-center">{{ strings.time }}</th>
            <th scope="col" class="text-center">{{ strings.details }}</th>
            <th scope="col" class="text-center">{{ strings.price }}</th>
          </tr>
        </thead>
        <tbody class="rounded">
          <tr
            v-for="(experienceData, index) in customExperiences"
            :key="`${experienceData.experience.id}-${index}`"
            class="align-middle"
          >
            <td>
              <div class="d-flex flex-row align-items-center">
                <img
                  :src="experienceData.experience.image"
                  class="rounded-circle"
                  style="width: 100px; height: 100px; object-fit: cover"
                  alt="Event Image"
                />
                <span class="fw-bold ms-3">{{
                  experienceData.experience.name
                }}</span>
              </div>
            </td>
            <td class="text-center">
              <span>{{ experienceStore.customExperience.guests }}</span>
            </td>
            <td class="text-center">
              <span>
                {{
                  capitalizeFirstLetter(experienceData.customExperience.time)
                }}
              </span>
            </td>
            <td class="text-center">
              <button
                type="button"
                class="btn btn-primary rounded-pill"
                data-bs-toggle="modal"
                :data-bs-target="`#custom-experience-${experienceData.experience.id}`"
              >
                {{ strings.viewDetails }}
              </button>
              <CustomExperienceModal
                :experience-data="experienceData"
                class="text-start"
              />
            </td>
            <td class="fs-5 fw-bold text-center">
              ${{
                experienceData.experience.price *
                  experienceData.customExperience.guests +
                experienceData.fee
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

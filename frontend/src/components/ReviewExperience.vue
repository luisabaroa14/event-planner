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
  // Extract experience IDs with timestamps (if applicable)
  const experienceIds = props.currentExperience
    ? experienceStore.customExperience.experienceIds.map((id) => ({ id }))
    : experienceStore.cartCustomExperiences?.flatMap((e) =>
        e.experienceIds.map((id) => ({ id, timestamp: e.timestamp }))
      ) || [];

  // Map the extracted IDs to find the corresponding experiences
  const mappedExperiences = experienceIds.map(({ id, timestamp }) => {
    const experience = experienceStore.experiences.find((exp) => exp.id === id);
    if (!experience) return null;

    // Find the associated custom experience (either current or from cart)
    const customExperience = props.currentExperience
      ? experienceStore.customExperience
      : experienceStore.cartCustomExperiences.find(
          (c) => c.timestamp === timestamp
        );

    if (!customExperience) return null;

    // Calculate fee if guests are below the minimum participants
    const fee =
      customExperience.guests < (experience.participants?.min ?? 0)
        ? experience.participants?.fee ?? 0
        : 0;

    // Return the structured object
    return {
      experience,
      customExperience,
      fee,
    };
  });
  // Filter out any null values (in case some experiences were not found)
  return mappedExperiences.filter(Boolean);
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
            <th v-if="!currentExperience" scope="col" class="text-center">
              {{ strings.remove }}
            </th>
          </tr>
        </thead>
        <tbody class="rounded">
          <tr
            v-for="(experienceData, index) in customExperiences"
            :key="`${experienceData?.experience.id}-${index}`"
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
              <span>{{ experienceData.customExperience.guests }}</span>
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
                :data-bs-target="`#custom-experience-${
                  experienceData.customExperience?.timestamp ?? 0
                }-${experienceData.experience.id}`"
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
            <td class="text-center">
              <i
                class="fas fa-trash fs-5 text-primary"
                role="button"
                @click="
                  experienceStore.removeCartExperience(
                    experienceData.customExperience.timestamp,
                    experienceData.experience.id
                  )
                "
              >
              </i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

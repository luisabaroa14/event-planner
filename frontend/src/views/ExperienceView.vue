<script setup>
import ExperienceList from "@/components/ExperienceList.vue";
import ImageCarousel from "@/components/ImageCarousel.vue";
import { ref, computed } from "vue";
import { useExperienceStore } from "@/stores/useExperienceStore";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import { productsFilterTags } from "@/utils/tagGroups";
import { capitalizeKebab } from "@/utils/functions";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const experienceStore = useExperienceStore();
const collaboratorStore = useCollaboratorStore();

const selectedFilterTag = ref("all");

const activeName = ref("");

const collaboratorId = computed(() => route.query.c);

const filteredExperiences = computed(() => {
  return experienceStore.experiences.filter((experience) => {
    const matchesTag =
      selectedFilterTag.value === "all" ||
      experience.tags.includes(selectedFilterTag.value);
    const matchesName =
      activeName.value === "" ||
      experience.name.toLowerCase().includes(activeName.value.toLowerCase());
    const matchesCollaborator =
      !collaboratorId.value ||
      experience.collaboratorId === collaboratorId.value;

    return matchesTag && matchesName && matchesCollaborator;
  });
});

const openCreateExperience = (remove) => {
  if (!remove) {
    router.push("/create-experience");
  }
};
</script>

<template>
  <div class="d-flex flex-column p-3">
    <div class="mx-3">
      <div class="d-flex justify-content-end align-items-center mb-3 flex-wrap">
        <div class="d-flex align-items-center ms-md-2 mt-md-0 mt-3">
          <span v-if="collaboratorId" class="badge bg-primary pill py-2 me-2">
            {{
              collaboratorStore.getCollaboratorById(collaboratorId)?.name ??
              "All"
            }}
            <i
              class="fas fa-close"
              @click="router.push({ name: 'experiences' })"
            ></i>
          </span>
          <input
            type="search"
            class="form-control"
            placeholder="Search experiences"
            v-model="activeName"
          />
          <div class="dropdown ms-2">
            <button
              class="btn btn-secondary dropdown-toggle bg-white"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{
                selectedFilterTag === "all"
                  ? "Type of food"
                  : capitalizeKebab(selectedFilterTag)
              }}
            </button>
            <ul
              class="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
              id="dropdownMenu"
            >
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent="selectedFilterTag = 'all'"
                  >All</a
                >
              </li>
              <li v-for="tag in productsFilterTags" :key="tag">
                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent="selectedFilterTag = tag"
                >
                  {{ capitalizeKebab(tag) }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="experienceStore.experiences">
        <ExperienceList
          @schedule="(data) => openCreateExperience(data)"
          :experiences="filteredExperiences"
        />
        <div class="my-5">
          <ImageCarousel
            v-if="experienceStore.experiences?.length"
            :images="experienceStore.experiences.map((e) => e.image)"
            :numberOfRows="1"
            :withSpace="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

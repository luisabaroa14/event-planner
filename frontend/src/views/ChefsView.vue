<script setup>
import { ref, computed } from "vue";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import CollaboratorList from "../components/CollaboratorList.vue";
import { capitalizeKebab } from "@/utils/functions";
import { cuisineFilterTags } from "@/utils/tagGroups";

const collaboratorStore = useCollaboratorStore();

const selectedFilterTag = ref("all");

const activeName = ref("");

const filteredCollaborators = computed(() => {
  return collaboratorStore.collaborators.filter((collaborator) => {
    const matchesTag =
      selectedFilterTag.value === "all" ||
      collaborator.tags.includes(selectedFilterTag.value);
    const matchesName =
      activeName.value === "" ||
      collaborator.name.toLowerCase().includes(activeName.value.toLowerCase());
    const matchesBrief =
      activeName.value === "" ||
      collaborator.brief?.toLowerCase().includes(activeName.value.toLowerCase());

    return matchesTag && (matchesName || matchesBrief);
  });
});
</script>

<template>
  <div class="d-flex flex-column p-3">
    <div class="mx-3">
      <div class="d-flex justify-content-end align-items-center mb-3 flex-wrap">
        <div class="d-flex align-items-center ms-md-2 mt-md-0 mt-3">
          <input
            type="search"
            class="form-control"
            placeholder="Search chefs"
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
                >
                  All
                </a>
              </li>
              <li v-for="tag in cuisineFilterTags" :key="tag">
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

      <CollaboratorList
        v-if="filteredCollaborators?.length"
        class="mt-4"
        :gridLayout="true"
        :collaborators="filteredCollaborators"
      />
    </div>
  </div>
</template>

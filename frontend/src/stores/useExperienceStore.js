import { defineStore } from "pinia";
import experienceService from "@/services/experiences";
import filesService from "@/services/files";
import { v4 as uuidv4 } from "uuid";
import { ref, computed, watch } from "vue";

export const useExperienceStore = defineStore("experienceStore", () => {
  // State
  const experiences = ref([]);
  const cartExperienceIds = ref([]);
  const errorMessage = ref(null);
  const quantities = ref({});

  const customExperience = ref({
    date: null,
    experienceIds: [],
    guests: 0,
    location: null,
    time: null,
    comments: "",
    productIds: null,
  });

  // Load data
  if (localStorage.getItem("cartExperienceIds")) {
    cartExperienceIds.value = JSON.parse(
      localStorage.getItem("cartExperienceIds")
    );
  }
  if (localStorage.getItem("experienceQuantities")) {
    quantities.value = JSON.parse(localStorage.getItem("experienceQuantities"));
  }

  const cartExperiences = computed(() => {
    return experiences.value.filter((experience) =>
      cartExperienceIds.value.includes(experience.id)
    );
  });

  const minNumberOfParts = computed(() => {
    const experienceIds = customExperience.value?.experienceIds;

    if (!experienceIds?.length) return 0;

    const experienceMinParts = experiences.value
      .filter((experience) => experienceIds?.includes(experience.id))
      .map((experience) => experience?.participants?.min ?? 0);

    // Get the highest number from experience min parts
    return Math.max(...experienceMinParts);
  });

  const isTimeValid = computed(() => {
    // Return false if null or outside valida range 12pm - 10pm
    if (!customExperience.value?.time) return false;
    const [hours, minutes] = customExperience.value?.time?.split(":").map(Number);

    return hours >= 12 && hours <= 22;
  });

  const status = computed(() => {
    return {
      1:
        customExperience.value?.date &&
        customExperience.value?.experienceIds?.length,
      2:
        customExperience.value?.guests > 0 &&
        customExperience.value?.guests >= minNumberOfParts.value,
      3:
        customExperience.value?.location &&
        customExperience.value?.time &&
        isTimeValid.value,
      4: customExperience.value?.productIds,
    };
  });

  watch(
    () => quantities.value,
    () => {
      localStorage.setItem(
        "experienceQuantities",
        JSON.stringify(quantities.value)
      );
    },
    { deep: true }
  );

  watch(
    () => cartExperienceIds.value,
    () => {
      localStorage.setItem(
        "cartExperienceIds",
        JSON.stringify(cartExperienceIds.value)
      );
    },
    { deep: true }
  );

  // Actions
  fetchExperiences();

  async function fetchExperiences() {
    const response = await experienceService.fetchExperiences();
    if (response.success) {
      experiences.value = response.data;
    } else {
      errorMessage.value = "Failed to fetch experiences";
    }
  }

  const createExperience = async (experience, uploadFile = false) => {
    // Upload image if it exists
    if (uploadFile && experience?.image) {
      // Generate a unique id and a path for the image
      const imageId = uuidv4();
      const storagePath = `experiences/${imageId}`;

      const response = await filesService.uploadFile(
        experience.image,
        storagePath
      );
      if (response.success) {
        experience.image = response.data;
      } else {
        return { success: false, error: response.error };
      }
    }

    const response = await experienceService.createExperience(experience);
    if (response.success) {
      experiences.value.push(response.data);
    } else {
      errorMessage.value = "Failed to create experience";
    }
  };

  const updateExperience = async (experience, uploadFile = false) => {
    // Upload image if it exists
    if (uploadFile && experience?.image) {
      // Generate a unique id and a path for the image
      const imageId = uuidv4();
      const storagePath = `experiences/${imageId}`;

      const response = await filesService.uploadFile(
        experience.image,
        storagePath
      );
      if (response.success) {
        experience.image = response.data;
      } else {
        return { success: false, error: response.error };
      }
    }

    const response = await experienceService.updateExperience(experience);
    if (response.success) {
      const index = experiences.value.findIndex((e) => e.id === experience.id);
      if (index !== -1) {
        experiences.value[index] = response.data;
      }
    } else {
      errorMessage.value = "Failed to update experience";
    }
  };

  const deleteExperience = async (experienceId) => {
    const response = await experienceService.deleteExperience(experienceId);
    if (response.success) {
      experiences.value = experiences.value.filter(
        (e) => e.id !== experienceId
      );
    } else {
      errorMessage.value = "Failed to delete experience";
    }
  };

  const addToCart = (experienceId) => {
    if (
      experiences.value.find((experience) => experience.id === experienceId) &&
      !cartExperienceIds.value.includes(experienceId)
    ) {
      cartExperienceIds.value.push(experienceId);
      quantities.value[experienceId] = 1;
    }
  };

  const removeFromCart = (experienceId) => {
    cartExperienceIds.value = cartExperienceIds.value.filter(
      (id) => id !== experienceId
    );
    delete quantities.value[experienceId];
  };

  const decrementQuantity = (experienceId) => {
    if (quantities.value[experienceId] > 1) {
      quantities.value[experienceId]--;
    } else {
      removeFromCart(experienceId);
    }
  };

  // Getters
  const getExperienceById = (id) => {
    return experiences.value.find((experience) => experience.id === id);
  };

  const addExperience = (experienceId) => {
    if (!customExperience.value.experienceIds?.includes(experienceId)) {
      customExperience.value.experienceIds.push(experienceId);
    }
  };

  const removeExperience = (id) => {
    customExperience.value.experienceIds =
      customExperience.value.experienceIds?.filter(
        (experienceId) => experienceId !== id
      );
  };

  const clearExperiences = () => {
    customExperience.value.experienceIds = [];
  };

  const removeExperiencesByCollaborator = (collaboratorId) => {
    customExperience.value.experienceIds =
      customExperience.value.experienceIds?.filter((experienceId) => {
        const experience = getExperienceById(experienceId);
        return experience.collaboratorId !== collaboratorId;
      });
  };

  const clearSelectedData = () => {
    customExperience.value = {
      date: null,
      experienceIds: [],
      guests: 0,
      location: null,
      time: null,
      comments: "",
      productIds: null,
    };
  }

  return {
    // State
    experiences,
    cartExperiences,
    cartExperienceIds,
    quantities,
    customExperience,
    status,
    isTimeValid,
    minNumberOfParts,

    // Actions
    errorMessage,
    fetchExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
    getExperienceById,
    addToCart,
    removeFromCart,
    decrementQuantity,
    addExperience,
    clearExperiences,
    clearSelectedData,
    removeExperience,
    removeExperiencesByCollaborator,
  };
});

import { defineStore } from "pinia";
import experienceService from "@/services/experiences";
import filesService from "@/services/files";
import { v4 as uuidv4 } from "uuid";
import { ref, computed, watch } from "vue";

export const useExperienceStore = defineStore("experienceStore", () => {
  // State
  const experiences = ref([]);
  const cartCustomExperiences = ref([]);
  const errorMessage = ref(null);

  const customExperience = ref({
    date: null,
    experienceIds: [],
    guests: 0,
    location: null,
    time: null,
    comments: "",
    productIds: null,
    timestamp: null,
  });

  // Load data
  if (localStorage.getItem("cartCustomExperiences")) {
    cartCustomExperiences.value = JSON.parse(
      localStorage.getItem("cartCustomExperiences")
    );
  }

  const selectedExperiencesData = computed(() => {
    const experienceIds = customExperience.value?.experienceIds;

    if (!experienceIds?.length) return [];

    // Filter experiences and map to an array of objects with min and fee
    const experienceData = experiences.value
      .filter((experience) => experienceIds.includes(experience.id))
      .map((experience) => ({
        id: experience.id,
        price: experience.price,
        min: experience?.participants?.min ?? 0,
        fee: experience?.participants?.fee ?? 0,
      }));

    return experienceData;
  });

  const totalFees = computed(() => {
    const guests = customExperience.value.guests;

    // If no guests, return 0
    if (!guests) return 0;

    // Sum the fees for all experiences where the guests count is less than the min number of participants
    const feeSum = selectedExperiencesData.value.reduce((sum, experience) => {
      if (guests < experience.min) {
        return sum + experience.fee; // Add fee if guests < min participants
      }
      return sum; // Otherwise, just return the current sum
    }, 0);

    return feeSum;
  });

  const minNumberOfParts = computed(() => {
    // return the highest min value from selectedExperiencesData
    return selectedExperiencesData.value.reduce((acc, curr) => {
      return curr.min > acc ? curr.min : acc;
    }, 0);
  });

  const status = computed(() => {
    return {
      1:
        customExperience.value?.date &&
        customExperience.value?.experienceIds?.length,
      2: customExperience.value?.location && customExperience.value?.time,
      3: customExperience.value?.guests > 0 && customExperience.value?.guests,
      4: customExperience.value?.productIds,
      5: true,
    };
  });

  watch(
    () => cartCustomExperiences.value,
    () => {
      localStorage.setItem(
        "cartCustomExperiences",
        JSON.stringify(cartCustomExperiences.value)
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

  const addCustomExperienceToCart = () => {
    customExperience.value.timestamp = new Date().getTime();

    // Check if the custom experience is already in the cart
    if (
      !cartCustomExperiences.value.some(
        (e) => e.timestamp === customExperience.value.timestamp
      )
    ) {
      cartCustomExperiences.value.push(customExperience.value);
      clearSelectedData();
    }
  };

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

  const removeCartExperience = (timestamp, experienceId) => {
    // Find the custom experience in the cart by timestamp
    const cartCurrentExperience = cartCustomExperiences.value.find(
      (experience) => experience.timestamp === timestamp
    );

    if (!cartCurrentExperience) return;

    // If only one experience is selected, remove the whole custom experience
    if (
      cartCurrentExperience.experienceIds.length === 1 &&
      cartCurrentExperience.experienceIds[0] === experienceId
    ) {
      cartCustomExperiences.value = cartCustomExperiences.value.filter(
        (experience) => experience.timestamp !== timestamp
      );

      // If there are no more custom experiences, clear the selected data
    } else if (cartCurrentExperience.experienceIds.length > 1) {
      cartCurrentExperience.experienceIds =
        cartCurrentExperience.experienceIds.filter((id) => experienceId !== id);
    }
  };

  const clearExperiences = () => {
    customExperience.value.experienceIds = [];
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
      timestamp: null,
    };
  };

  return {
    // State
    experiences,
    cartCustomExperiences,
    customExperience,
    status,
    minNumberOfParts,
    selectedExperiencesData,
    totalFees,

    // Actions
    errorMessage,
    fetchExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
    getExperienceById,
    addExperience,
    clearExperiences,
    clearSelectedData,
    removeExperience,
    removeCartExperience,
    addCustomExperienceToCart,
  };
});

import { defineStore } from "pinia";
import collaboratorService from "@/services/collaborators";
import filesService from "@/services/files";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

export const useCollaboratorStore = defineStore("collaboratorStore", () => {
  // State
  const collaborators = ref([]);
  const errorMessage = ref(null);

  // Actions
  fetchCollaborators();

  async function fetchCollaborators() {
    const response = await collaboratorService.fetchCollaborators();
    if (response.success) {
      collaborators.value = response.data;
    } else {
      errorMessage.value = "Failed to fetch collaborators";
    }
  }

  const createCollaborator = async (collaborator, uploadFile = false) => {
    // Upload image if it exists
    if (uploadFile && collaborator?.image) {
      // Generate a unique id and a path for the image
      const imageId = uuidv4();
      const storagePath = `collaborators/${imageId}`;

      const response = await filesService.uploadFile(collaborator.image, storagePath);
      if (response.success) {
        collaborator.image = response.data;
      } else {
        return { success: false, error: response.error };
      }
    }

    const response = await collaboratorService.createCollaborator(collaborator);
    if (response.success) {
      collaborators.value.push(response.data);
    } else {
      errorMessage.value = "Failed to create collaborator";
    }
  };

  const updateCollaborator= async (collaborator, uploadFile = false) => {
    // Upload image if it exists
    if (uploadFile && collaborator?.image) {
      // Generate a unique id and a path for the image
      const imageId = uuidv4();
      const storagePath = `collaborators/${imageId}`;

      const response = await filesService.uploadFile(collaborator.image, storagePath);
      if (response.success) {
        collaborator.image = response.data;
      } else {
        return { success: false, error: response.error };
      }
    }
    
    const response = await collaboratorService.updateCollaborator(collaborator);
    if (response.success) {
      const index = collaborators.value.findIndex((e) => e.id === collaborator.id);
      if (index !== -1) {
        collaborators.value[index] = response.data;
      }
    } else {
      errorMessage.value = "Failed to update collaborator";
    }
  };

  const deleteCollaborator = async (collaboratorId) => {
    const response = await collaboratorService.deleteCollaborator(collaboratorId);
    if (response.success) {
      collaborators.value = collaborators.value.filter((e) => e.id !== collaboratorId);
    } else {
      errorMessage.value = "Failed to delete collaborator";
    }
  };

  // Getters
  const getCollaboratorById = (id) => {
    return collaborators.value.find((collaborator) => collaborator.id === id);
  };

  // Return state, actions, and getters
  return {
    collaborators,
    errorMessage,
    fetchCollaborators,
    createCollaborator,
    updateCollaborator,
    deleteCollaborator,
    getCollaboratorById,
  };
});

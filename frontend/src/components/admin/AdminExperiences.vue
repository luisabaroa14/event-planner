<script setup>
import { ref, onMounted } from "vue";
import { useExperienceStore } from "@/stores/useExperienceStore";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import { capitalizeKebab, toKebabCase } from "@/utils/functions";
import { Tooltip } from "bootstrap";

const collaboratorStore = useCollaboratorStore();
const experienceStore = useExperienceStore();

const name = ref("");
const description = ref("");
const price = ref(0);
const image = ref(null);
const collaboratorId = ref("");
const tags = ref([]);
const participants = ref({ min: 0, max: 0, fee: 0 });
const uploadFile = ref(false);

const newTag = ref("");

const experienceToUpdate = ref(null);

onMounted(() => {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new Tooltip(tooltipTriggerEl);
  });
});

const clearForm = () => {
  name.value = "";
  image.value = "";
  description.value = "";
  price.value = 0;
  collaboratorId.value = "";
  tags.value = [];
  newTag.value = "";
  participants.value = { min: 0, max: 0, fee: 0 };

  uploadFile.value = false;
  experienceToUpdate.value = null;
};

const handleCreateExperience = async () => {
  await experienceStore.createExperience(
    {
      name: name.value,
      image: image.value,
      description: description.value,
      price: price.value,
      collaboratorId: collaboratorId.value,
      tags: tags.value,
      participants: participants.value,
    },
    uploadFile.value
  );

  clearForm();
};

const handleUpdateExperience = async () => {
  if (uploadFile.value && image.value) {
    experienceToUpdate.value.image = image.value;
  }
  await experienceStore.updateExperience(
    experienceToUpdate.value,
    uploadFile.value
  );

  clearForm();
};

const updateExperience = (experience) => {
  experienceToUpdate.value = JSON.parse(JSON.stringify(experience));

  // If the image is a URL, set uploadFile to false
  uploadFile.value = false;
};

// Handle file upload
const handleFileUpload = async (experience) => {
  const file = experience.target.files[0];

  // Set the image value to the file
  image.value = file;
  uploadFile.value = true;
};

const addTag = async (update = false) => {
  if (!newTag.value) return;

  const tag = toKebabCase(newTag.value);
  const tagList = update ? experienceToUpdate.value.tags : tags.value;

  // Check if the tag is already in the list
  if (tagList.includes(tag)) return;

  tagList.push(tag);
  newTag.value = "";
};
</script>

<template>
  <div>
    <div v-if="experienceToUpdate">
      <h3>Update Experience</h3>
      <form @submit.prevent="handleUpdateExperience">
        <label>Name:</label>
        <input
          class="form-control w-100"
          v-model="experienceToUpdate.name"
          required
        />
        <br />
        <label>Description:</label>
        <input
          class="form-control w-100"
          v-model="experienceToUpdate.description"
          required
        />
        <br />
        <label>Price:</label>
        <div class="input-group">
          <input
            class="form-control"
            type="number"
            v-model="experienceToUpdate.price"
            required
            step="any"
            @input="
              (experience) => {
                experienceToUpdate.price = experience.target.value.replace(
                  '-',
                  ''
                );
              }
            "
          />
          <div class="input-group-append">
            <span
              class="input-group-text bg-primary border-primary rounded-0 rounded-end text-white ms-1"
            >
              $
            </span>
          </div>
        </div>
        <br />
        <label>Collaborator:</label>
        <select
          class="form-control"
          v-model="experienceToUpdate.collaboratorId"
        >
          <option value="">Select a collaborator</option>
          <option
            v-for="collaborator in collaboratorStore.collaborators"
            :key="collaborator.id"
            :value="collaborator.id"
          >
            {{ collaborator.name }}
          </option>
        </select>
        <br />
        <label>Participants:</label>
        <div class="input-group">
          <span class="input-group-text">Min</span>
          <input
            type="number"
            class="form-control"
            v-model="experienceToUpdate.participants.min"
            required
            step="any"
          />
          <span class="input-group-text">Max</span>
          <input
            type="number"
            class="form-control"
            v-model="experienceToUpdate.participants.max"
            step="any"
          />
          <span class="input-group-text">Fee</span>
          <input
            type="number"
            class="form-control"
            v-model="experienceToUpdate.participants.fee"
            step="any"
          />
          <div class="input-group-append">
            <span
              class="input-group-text bg-primary border-primary rounded-0 rounded-end text-white ms-1"
            >
              $
            </span>
          </div>
        </div>
        <br />
        <label>Tags:</label>
        <div class="d-flex flex-wrap">
          <span
            v-for="tag in experienceToUpdate.tags"
            :key="tag"
            class="badge bg-primary me-2 mb-2 d-flex align-items-center"
          >
            {{ capitalizeKebab(tag) }}
            <i
              class="fas fa-times ms-2"
              style="cursor: pointer"
              @click="
                experienceToUpdate.tags = experienceToUpdate.tags.filter(
                  (t) => t !== tag
                )
              "
            ></i>
          </span>
        </div>
        <div class="input-group">
          <input
            v-model="newTag"
            class="form-control"
            placeholder="Add a new Tag"
          />
          <button
            class="ms-1 btn btn-primary"
            type="button"
            @click="addTag(true)"
          >
            {{ "Add Tag" }}
          </button>
        </div>
        <br />
        <label>Image:</label>
        <div class="input-group">
          <input
            v-if="!uploadFile"
            id="image-url"
            v-model="experienceToUpdate.image"
            class="form-control"
            type="url"
            placeholder="Enter image URL"
          />
          <input
            v-if="uploadFile"
            id="image-file"
            class="form-control"
            type="file"
            @change="handleFileUpload"
          />
          <button
            class="ms-1 btn btn-primary"
            type="button"
            @click="uploadFile = !uploadFile"
          >
            {{ uploadFile ? "Use Link" : "Upload File" }}
          </button>
        </div>
        <button
          class="btn btn-primary w-100"
          @click="experienceToUpdate = null"
        >
          Cancel
        </button>
        <button class="btn btn-primary w-100 mt-3" type="submit">
          Update Experience
        </button>
      </form>
    </div>
    <div v-else>
      <h3>Add Experience</h3>
      <form @submit.prevent="handleCreateExperience">
        <label>Name:</label>
        <input class="form-control w-100" v-model="name" required />
        <br />
        <label>Description:</label>
        <input class="form-control w-100" v-model="description" required />
        <br />
        <label>Price:</label>
        <div class="input-group">
          <input
            type="number"
            class="form-control"
            v-model="price"
            required
            step="any"
            @input="
              (experience) => {
                price = experience.target.value.replace('-', '');
              }
            "
          />
          <div class="input-group-append">
            <span
              class="input-group-text bg-primary border-primary rounded-0 rounded-end text-white ms-1"
            >
              $
            </span>
          </div>
        </div>
        <br />
        <label>Collaborator:</label>
        <select class="form-control" v-model="collaboratorId">
          <option value="">Select a collaborator</option>
          <option
            v-for="collaborator in collaboratorStore.collaborators"
            :key="collaborator.id"
            :value="collaborator.id"
          >
            {{ collaborator.name }}
          </option>
        </select>
        <br />
        <label>Participants:</label>
        <div class="input-group">
          <span class="input-group-text">Min</span>
          <input
            type="number"
            class="form-control"
            v-model="participants.min"
            required
            step="any"
          />
          <span class="input-group-text">
            Max
            <i
              class="fas fa-circle-info ms-2"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Not required"
            ></i>
          </span>
          <input
            type="number"
            class="form-control"
            v-model="participants.max"
            step="any"
          />
          <span class="input-group-text">
            Fee
            <i
              class="fas fa-circle-info ms-2"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="The fee will be charged if the min participants is not reached"
            ></i>
          </span>
          <input
            type="number"
            class="form-control"
            v-model="participants.fee"
            step="any"
          />
          <div class="input-group-append">
            <span
              class="input-group-text bg-primary border-primary rounded-0 rounded-end text-white ms-1"
            >
              $
            </span>
          </div>
        </div>
        <br />
        <label>Tags:</label>
        <div class="d-flex flex-wrap">
          <span
            v-for="tag in tags"
            :key="tag"
            class="badge bg-primary me-2 mb-2 d-flex align-items-center"
          >
            {{ capitalizeKebab(tag) }}
            <i
              class="fas fa-times ms-2"
              @click="tags = tags.filter((t) => t !== tag)"
              style="cursor: pointer"
            ></i>
          </span>
        </div>
        <div class="input-group">
          <input
            v-model="newTag"
            class="form-control"
            placeholder="Add a new Tag"
          />
          <button
            class="ms-1 btn btn-primary"
            type="button"
            @click="addTag(false)"
          >
            {{ "Add Tag" }}
          </button>
        </div>
        <br />
        <label>Image:</label>
        <div class="input-group">
          <input
            v-if="!uploadFile"
            id="image-url"
            v-model="image"
            class="form-control"
            type="url"
            placeholder="Enter image URL"
          />
          <input
            v-if="uploadFile"
            id="image-file"
            class="form-control"
            type="file"
            @change="handleFileUpload"
          />
          <button
            class="ms-1 btn btn-primary"
            type="button"
            @click="uploadFile = !uploadFile"
          >
            {{ uploadFile ? "Use Link" : "Upload File" }}
          </button>
        </div>

        <br />
        <button class="btn btn-primary w-100" type="submit">
          Add Experience
        </button>
      </form>
    </div>

    <h3 class="mt-4">Experiences</h3>
    <table class="w-100">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Description</th>
          <th>Collaborator</th>
          <th>Participants</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr
          v-for="experience in experienceStore.experiences"
          :key="experience.id"
        >
          <td class="text-center">{{ experience.name }}</td>
          <td>
            <img :src="experience.image" style="width: 100px; height: 100px" />
          </td>
          <td class="fw-bold">{{ experience.price }}$</td>
          <td>{{ experience.description }}</td>
          <td class="text-center">
            {{
              collaboratorStore.getCollaboratorById(experience?.collaboratorId)
                ?.name ?? "None"
            }}
          </td>
          <td class="text-center fw-bold">
            Min: {{ experience?.participants?.min ?? 0 }}<br />
            Max: {{ experience?.participants?.max || 'N/a' }}<br />
            Fee: {{ experience?.participants?.fee ?? 0 }}$
          </td>
          <td>
            <span
              v-for="tag in experience.tags"
              :key="tag"
              class="badge bg-primary me-2"
            >
              {{ capitalizeKebab(tag) }}
            </span>
          </td>
          <td>
            <button
              class="btn btn-secondary"
              @click="updateExperience(experience)"
            >
              Update
            </button>
            <button
              class="btn btn-danger ms-2"
              @click="experienceStore.deleteExperience(experience.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 1em;
}
</style>

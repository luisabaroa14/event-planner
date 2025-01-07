<script setup>
import { ref } from "vue";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import {
  capitalizeKebab,
  toKebabCase,
  capitalizeFirstLetter,
} from "@/utils/functions";
import { daysOfWeekTags } from "../../utils/tagGroups";
import dayjs from "dayjs";

const collaboratorStore = useCollaboratorStore();

const name = ref("");
const description = ref("");
const brief = ref("");
const image = ref(null);
const tags = ref([]);
const availableDates = ref({
  patterns: [],
  blockedDates: [],
  extraDates: [],
});

const uploadFile = ref(false);

const collaboratorToUpdate = ref(null);

const newTag = ref("");

const clearForm = () => {
  name.value = "";
  image.value = "";
  description.value = "";
  brief.value = "";
  tags.value = [];
  availableDates.value = {
    patterns: [],
    blockedDates: [],
    extraDates: [],
  };

  newTag.value = "";

  uploadFile.value = false;
  collaboratorToUpdate.value = null;
};

const handleCreateCollaborator = async () => {
  await collaboratorStore.createCollaborator(
    {
      name: name.value,
      image: image.value,
      description: description.value,
      brief: brief.value,
      availableDates: availableDates.value,
      tags: tags.value,
    },
    uploadFile.value
  );

  clearForm();
};

const handleUpdateCollaborator = async () => {
  if (uploadFile.value && image.value) {
    collaboratorToUpdate.value.image = image.value;
  }
  await collaboratorStore.updateCollaborator(
    collaboratorToUpdate.value,
    uploadFile.value
  );

  clearForm();
};

const updateCollaborator = (collaborator) => {
  if (!collaborator.availableDates) {
    collaborator.availableDates = {
      patterns: [],
      blockedDates: [],
      extraDates: [],
    };
  }

  collaboratorToUpdate.value = JSON.parse(JSON.stringify(collaborator));

  // If the image is a URL, set uploadFile to false
  uploadFile.value = false;
};

// Handle file upload
const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  // Set the image value to the file
  image.value = file;
  uploadFile.value = true;
};

const addTag = async (update = false) => {
  if (!newTag.value) return;

  const tag = toKebabCase(newTag.value);
  const tagList = update ? collaboratorToUpdate.value.tags : tags.value;

  // Check if the tag is already in the list
  if (tagList.includes(tag)) return;

  tagList.push(tag);
  newTag.value = "";
};

const addDate = (availableDates, date, blocked = false) => {
  const array = blocked
    ? availableDates.blockedDates
    : availableDates.extraDates;

  if (date && !array?.includes(date)) {
    array.push(date);
  }
};

const removeDate = (availableDates, date, blocked = false) => {
  const array = blocked
    ? availableDates.blockedDates
    : availableDates.extraDates;

  const index = array.indexOf(date);
  if (index > -1) {
    array.splice(index, 1);
  }
};

const togglePattern = (availableDates, day) => {
  if (!availableDates?.patterns) return;

  if (availableDates.patterns?.includes(day)) {
    availableDates.patterns = availableDates.patterns.filter((d) => d !== day);
  } else {
    availableDates.patterns.push(day);
  }
};
</script>

<template>
  <div>
    <div v-if="collaboratorToUpdate">
      <h3>Update Collaborator</h3>
      <form @submit.prevent="handleUpdateCollaborator">
        <label>Name:</label>
        <input
          class="form-control w-100"
          v-model="collaboratorToUpdate.name"
          required
        />
        <br />
        <label>Brief:</label>
        <input
          class="form-control w-100"
          v-model="collaboratorToUpdate.brief"
          required
        />
        <br />
        <label>Description:</label>
        <input
          class="form-control w-100"
          v-model="collaboratorToUpdate.description"
          required
        />
        <br />
        <label>Available Days:</label>
        <div class="w-100">
          <div
            v-for="day in daysOfWeekTags"
            :key="`${day}-button`"
            class="btn btn-primary me-2 mb-2"
            type="button"
            :class="
              collaboratorToUpdate?.availableDates?.patterns?.includes(day)
                ? 'btn-primary'
                : 'btn-secondary'
            "
            @click="togglePattern(collaboratorToUpdate?.availableDates, day)"
          >
            {{ day.charAt(0).toUpperCase() + day.slice(1) }}
          </div>
        </div>
        <br />
        <label>Blocked dates:</label>
        <div class="input-group">
          <div class="d-flex flex-wrap form-control">
            <span
              v-for="date in collaboratorToUpdate?.availableDates?.blockedDates"
              :key="date"
              class="badge bg-primary me-2 my-2 d-flex align-items-center"
            >
              {{ dayjs(date).format("DD MMM YYYY") }}
              <i
                class="fas fa-times ms-2"
                @click="
                  removeDate(collaboratorToUpdate?.availableDates, date, true)
                "
                style="cursor: pointer"
              ></i>
            </span>
          </div>
          <input
            type="date"
            ref="dateInput"
            class="btn btn-primary text-white"
            style="color-scheme: dark"
            @change="
              addDate(
                collaboratorToUpdate?.availableDates,
                $event.target.value,
                true
              )
            "
          />
        </div>
        <br />
        <label>Extra dates:</label>
        <div class="input-group">
          <div class="d-flex flex-wrap form-control">
            <span
              v-for="date in collaboratorToUpdate?.availableDates?.extraDates"
              :key="date"
              class="badge bg-primary me-2 my-2 d-flex align-items-center"
            >
              {{ dayjs(date).format("DD MMM YYYY") }}
              <i
                class="fas fa-times ms-2"
                @click="
                  removeDate(collaboratorToUpdate?.availableDates, date, false)
                "
                style="cursor: pointer"
              ></i>
            </span>
          </div>
          <input
            type="date"
            ref="dateInput"
            class="btn btn-primary text-white"
            style="color-scheme: dark"
            @change="
              addDate(
                collaboratorToUpdate?.availableDates,
                $event.target.value,
                false
              )
            "
          />
        </div>
        <br />

        <label>Tags:</label>
        <div class="d-flex flex-wrap">
          <span
            v-for="tag in collaboratorToUpdate.tags"
            :key="tag"
            class="badge bg-primary me-2 mb-2 d-flex align-items-center"
          >
            {{ capitalizeKebab(tag) }}
            <i
              class="fas fa-times ms-2"
              style="cursor: pointer"
              @click="
                collaboratorToUpdate.tags = collaboratorToUpdate.tags.filter(
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
            v-model="collaboratorToUpdate.image"
            class="form-control"
            type="url"
            placeholder="Enter image URL"
            required
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
        <button
          class="btn btn-primary w-100"
          @click="collaboratorToUpdate = null"
        >
          Cancel
        </button>
        <button class="btn btn-primary w-100 mt-3" type="submit">
          Update Collaborator
        </button>
      </form>
    </div>
    <div v-else>
      <h3>Add Collaborator</h3>
      <form @submit.prevent="handleCreateCollaborator">
        <label>Name:</label>
        <input class="form-control w-100" v-model="name" required />
        <br />
        <label>Brief:</label>
        <input class="form-control w-100" v-model="brief" required />
        <br />
        <label>Description:</label>
        <input class="form-control w-100" v-model="description" required />
        <br />
        <label>Available Days:</label>
        <div class="w-100">
          <div
            v-for="day in daysOfWeekTags"
            :key="`${day}-button`"
            class="btn btn-primary me-2 mb-2"
            type="button"
            :class="
              availableDates.patterns?.includes(day)
                ? 'btn-primary'
                : 'btn-secondary'
            "
            @click="togglePattern(availableDates, day)"
          >
            {{ day.charAt(0).toUpperCase() + day.slice(1) }}
          </div>
        </div>
        <br />
        <label>Blocked dates:</label>
        <div class="input-group">
          <div class="d-flex flex-wrap form-control">
            <span
              v-for="date in availableDates.blockedDates"
              :key="date"
              class="badge bg-primary me-2 my-2 d-flex align-items-center"
            >
              {{ dayjs(date).format("DD MMM YYYY") }}
              <i
                class="fas fa-times ms-2"
                @click="removeDate(availableDates, date, true)"
                style="cursor: pointer"
              ></i>
            </span>
          </div>
          <input
            type="date"
            ref="dateInput"
            class="btn btn-primary text-white"
            style="color-scheme: dark"
            @change="addDate(availableDates, $event.target.value, true)"
          />
        </div>
        <br />
        <label>Extra dates:</label>
        <div class="input-group">
          <div class="d-flex flex-wrap form-control">
            <span
              v-for="date in availableDates.extraDates"
              :key="date"
              class="badge bg-primary me-2 my-2 d-flex align-items-center"
            >
              {{ dayjs(date).format("DD MMM YYYY") }}
              <i
                class="fas fa-times ms-2"
                @click="removeDate(availableDates, date, false)"
                style="cursor: pointer"
              ></i>
            </span>
          </div>
          <input
            type="date"
            ref="dateInput"
            class="btn btn-primary text-white"
            style="color-scheme: dark"
            @change="addDate(availableDates, $event.target.value, false)"
          />
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
            required
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
          Add Collaborator
        </button>
      </form>
    </div>

    <h3 class="mt-4">Collaborators</h3>
    <table class="w-100">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Brief</th>
          <th>Description</th>
          <th>Tags</th>
          <th>Available Dates</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="collaborator in collaboratorStore.collaborators"
          :key="collaborator.id"
        >
          <td>{{ collaborator.name }}</td>
          <td>
            <img
              :src="collaborator.image"
              style="width: 100px; height: 100px"
            />
          </td>
          <td>{{ collaborator.brief }}</td>
          <td>{{ collaborator.description }}</td>
          <td>
            <span
              v-for="tag in collaborator.tags"
              :key="tag"
              class="badge bg-primary me-2"
            >
              {{ capitalizeKebab(tag) }}
            </span>
          </td>
          <td style="width: 150px">
            <div>
              <strong>Days:</strong>
              {{
                collaborator.availableDates?.patterns
                  ?.map((d) => capitalizeFirstLetter(d))
                  .join(", ") || "None"
              }}
            </div>
            <div>
              <strong>Blocked:</strong>
              {{
                collaborator.availableDates?.blockedDates
                  ?.map((d) => dayjs(d).format("DD/MMM/YYYY"))
                  .join(", ") || "None"
              }}
            </div>
            <div>
              <strong>Extras:</strong>
              {{
                collaborator.availableDates?.extraDates
                  ?.map((d) => dayjs(d).format("DD/MMM/YYYY"))
                  .join(", ") || "None"
              }}
            </div>
          </td>
          <td>
            <button
              class="btn btn-secondary"
              @click="updateCollaborator(collaborator)"
            >
              Update
            </button>
            <button
              class="btn btn-danger ms-2"
              @click="collaboratorStore.deleteCollaborator(collaborator.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

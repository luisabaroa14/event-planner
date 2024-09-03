<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/useProductStore";
import { useCollaboratorStore } from "@/stores/useCollaboratorStore";
import { capitalizeKebab, toKebabCase } from "@/utils/functions";

const collaboratorStore = useCollaboratorStore();
const productStore = useProductStore();

const name = ref("");
const description = ref("");
const price = ref(0);
const collaboratorId = ref("");
const tags = ref([]);
const image = ref(null);
const uploadFile = ref(false);

const productToUpdate = ref(null);

const newTag = ref("");

const clearForm = () => {
  name.value = "";
  image.value = "";
  description.value = "";
  price.value = 0;
  collaboratorId.value = "";
  tags.value = [];
  newTag.value = "";

  uploadFile.value = false;
  productToUpdate.value = null;
};

const handleCreateProduct = async () => {
  await productStore.createProduct(
    {
      name: name.value,
      image: image.value,
      description: description.value,
      price: price.value,
      collaboratorId: collaboratorId.value,
      tags: tags.value,
    },
    uploadFile.value
  );

  clearForm();
};

const handleUpdateProduct = async () => {
  if (uploadFile.value && image.value) {
    productToUpdate.value.image = image.value;
  }
  await productStore.updateProduct(productToUpdate.value, uploadFile.value);

  clearForm();
};

const updateProduct = (product) => {
  productToUpdate.value = JSON.parse(JSON.stringify(product));

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
  const tagList = update ? productToUpdate.value.tags : tags.value;

  // Check if the tag is already in the list
  if (tagList.includes(tag)) return;

  tagList.push(tag);
  newTag.value = "";
};
</script>

<template>
  <div>
    <div v-if="productToUpdate">
      <h3>Update Product</h3>
      <form @submit.prevent="handleUpdateProduct">
        <label>Name:</label>
        <input
          class="form-control w-100"
          v-model="productToUpdate.name"
          required
        />
        <br />
        <label>Description:</label>
        <input
          class="form-control w-100"
          v-model="productToUpdate.description"
          required
        />
        <br />
        <label>Price:</label>
        <div class="input-group">
          <input
            class="form-control"
            type="number"
            v-model="productToUpdate.price"
            required
            step="any"
            @input="
              (event) => {
                productToUpdate.price = event.target.value.replace('-', '');
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
        <select class="form-control" v-model="productToUpdate.collaboratorId">
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
        <label>Tags:</label>
        <div class="d-flex flex-wrap">
          <span
            v-for="tag in productToUpdate.tags"
            :key="tag"
            class="badge bg-primary me-2 mb-2 d-flex align-items-center"
          >
            {{ capitalizeKebab(tag) }}
            <i
              class="fas fa-times ms-2"
              style="cursor: pointer"
              @click="
                productToUpdate.tags = productToUpdate.tags.filter(
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
            v-model="productToUpdate.image"
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
        <button class="btn btn-primary w-100" @click="productToUpdate = null">
          Cancel
        </button>
        <button class="btn btn-primary w-100 mt-3" type="submit">
          Update Product
        </button>
      </form>
    </div>
    <div v-else>
      <h3>Add Product</h3>
      <form @submit.prevent="handleCreateProduct">
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
              (event) => {
                price = event.target.value.replace('-', '');
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
        <button class="btn btn-primary w-100" type="submit">Add Product</button>
      </form>
    </div>

    <h3 class="mt-4">Products</h3>
    <table class="w-100">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Description</th>
          <th>Price</th>
          <th>Collaborator</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productStore.products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>
            <img :src="product.image" style="width: 100px; height: 100px" />
          </td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>
            {{
              collaboratorStore.getCollaboratorById(product?.collaboratorId)
                ?.name ?? "None"
            }}
          </td>
          <td>
            <span
              v-for="tag in product.tags"
              :key="tag"
              class="badge bg-primary me-2"
            >
              {{ capitalizeKebab(tag) }}
            </span>
          </td>
          <td>
            <button class="btn btn-secondary" @click="updateProduct(product)">
              Update
            </button>
            <button
              class="btn btn-danger ms-2"
              @click="productStore.deleteProduct(product.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

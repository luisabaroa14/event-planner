<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/useProductStore";

const productStore = useProductStore();

const name = ref("");
const description = ref("");
const price = ref(0);
const image = ref(null);
const uploadFile = ref(false);

const productToUpdate = ref(null);

const clearForm = () => {
  name.value = "";
  image.value = "";
  description.value = "";
  price.value = 0;

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
          <input type="number" class="form-control" v-model="price" required />
          <div class="input-group-append">
            <span
              class="input-group-text bg-primary border-primary rounded-0 rounded-end text-white ms-1"
            >
              $
            </span>
          </div>
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

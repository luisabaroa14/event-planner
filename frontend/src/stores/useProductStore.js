import { defineStore } from "pinia";
import productService from "@/services/products";
import filesService from "@/services/files";
import { v4 as uuidv4 } from "uuid";
import { ref, computed, watch } from "vue";

export const useProductStore = defineStore("productStore", () => {
  // State
  const products = ref([]);
  const cartProductIds = ref([]);
  const errorMessage = ref(null);
  const quantities = ref({});

  const CART_PRODUCT_IDS = "cartProductIds";
  const PRODUCT_QUANTITIES = "productQuantities";

  // Load data
  if (localStorage.getItem(CART_PRODUCT_IDS)) {
    cartProductIds.value = JSON.parse(localStorage.getItem(CART_PRODUCT_IDS));
  }
  if (localStorage.getItem(PRODUCT_QUANTITIES)) {
    quantities.value = JSON.parse(localStorage.getItem(PRODUCT_QUANTITIES));
  }

  const cartProducts = computed(() => {
    localStorage.setItem(
      CART_PRODUCT_IDS,
      JSON.stringify(cartProductIds.value)
    );
    return products.value.filter((product) =>
      cartProductIds.value.includes(product.id)
    );
  });

  watch(
    () => cartProductIds.value,
    () => {
      localStorage.setItem(
        CART_PRODUCT_IDS,
        JSON.stringify(cartProductIds.value)
      );
    },
    { deep: true }
  );

  watch(
    () => quantities.value,
    () => {
      localStorage.setItem(
        PRODUCT_QUANTITIES,
        JSON.stringify(quantities.value)
      );
    },
    { deep: true }
  );

  // Actions
  fetchProducts();

  async function fetchProducts() {
    const response = await productService.fetchProducts();
    if (response.success) {
      products.value = response.data;
    } else {
      errorMessage.value = "Failed to fetch products";
    }
  }

  const createProduct = async (product, uploadFile = false) => {
    // Upload image if it exists
    if (uploadFile && product?.image) {
      // Generate a unique id and a path for the image
      const imageId = uuidv4();
      const storagePath = `products/${imageId}`;

      const response = await filesService.uploadFile(
        product.image,
        storagePath
      );
      if (response.success) {
        product.image = response.data;
      } else {
        return { success: false, error: response.error };
      }
    }

    const response = await productService.createProduct(product);
    if (response.success) {
      products.value.push(response.data);
    } else {
      errorMessage.value = "Failed to create product";
    }
  };

  const updateProduct = async (product, uploadFile = false) => {
    // Upload image if it exists
    if (uploadFile && product?.image) {
      // Generate a unique id and a path for the image
      const imageId = uuidv4();
      const storagePath = `products/${imageId}`;

      const response = await filesService.uploadFile(
        product.image,
        storagePath
      );
      if (response.success) {
        product.image = response.data;
      } else {
        return { success: false, error: response.error };
      }
    }

    const response = await productService.updateProduct(product);
    if (response.success) {
      const index = products.value.findIndex((e) => e.id === product.id);
      if (index !== -1) {
        products.value[index] = response.data;
      }
    } else {
      errorMessage.value = "Failed to update product";
    }
  };

  const deleteProduct = async (productId) => {
    const response = await productService.deleteProduct(productId);
    if (response.success) {
      products.value = products.value.filter((e) => e.id !== productId);
    } else {
      errorMessage.value = "Failed to delete product";
    }
  };

  const addToCart = (productId) => {
    if (
      products.value.find((product) => product.id === productId) &&
      !cartProductIds.value.includes(productId)
    ) {
      cartProductIds.value.push(productId);
      quantities.value[productId] = 1;
    }
  };

  const removeFromCart = (productId) => {
    cartProductIds.value = cartProductIds.value.filter(
      (id) => id !== productId
    );
    delete quantities.value[productId];
  };

  const decrementQuantity = (productId) => {
    if (quantities.value[productId] > 1) {
      quantities.value[productId]--;
    } else {
      removeFromCart(productId);
    }
  };

  // Getters
  const getProductById = (id) => {
    return products.value.find((product) => product.id === id);
  };

  return {
    // State
    products,
    cartProducts,
    cartProductIds,
    quantities,

    // Actions
    errorMessage,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    addToCart,
    removeFromCart,
    decrementQuantity,
  };
});

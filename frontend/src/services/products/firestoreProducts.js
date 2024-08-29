import firebaseApp from "@/utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  doc,
  getFirestore,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);
const productsCollection = collection(db, "products");

export default {
  async fetchProducts() {
    try {
      const querySnapshot = await getDocs(query(productsCollection));
      const data = querySnapshot.docs.map((doc) => {
        const document = doc.data();
        return { id: doc.id, ...document };
      });

      return { success: true, data: data };
    } catch (error) {
      console.error("Error fetching products:", error);
      return { success: false, error: error.message };
    }
  },

  async createProduct(product) {
    try {
      const docRef = await addDoc(productsCollection, product);
      const data = { id: docRef.id, ...product };
      return { success: true, data: data };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, error: error.message };
    }
  },

  async updateProduct(product) {
    try {
      const productDoc = doc(productsCollection, product.id);
      await updateDoc(productDoc, product);
      return { success: true, data: product };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, error: error.message };
    }
  },

  async deleteProduct(productId) {
    try {
      const productDoc = doc(productsCollection, productId);
      await deleteDoc(productDoc);
      return { success: true, data: productId };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, error: error.message };
    }
  },
};

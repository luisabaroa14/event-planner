import firebaseApp from "@/utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  doc,
  getFirestore,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);
const ordersCollection = collection(db, "orders");

export default {
  async fetchOrders() {
    try {
      const querySnapshot = await getDocs(query(ordersCollection));
      const data = querySnapshot.docs.map((doc) => {
        const document = doc.data();
        return { id: doc.id, ...document };
      });

      return { success: true, data: data };
    } catch (error) {
      console.error("Error fetching orders:", error);
      return { success: false, error: error.message };
    }
  },

  async createOrder(order) {
    try {
      const docRef = await addDoc(ordersCollection, order);
      const data = { id: docRef.id, ...order };
      return { success: true, data: data };
    } catch (error) {
      console.error("Error creating order:", error);
      return { success: false, error: error.message };
    }
  },

  async updateOrder(order) {
    try {
      const orderDoc = doc(ordersCollection, order.id);
      await updateDoc(orderDoc, order);
      return { success: true, data: order };
    } catch (error) {
      console.error("Error updating order:", error);
      return { success: false, error: error.message };
    }
  },

  async deleteOrder(orderId) {
    try {
      const orderDoc = doc(ordersCollection, orderId);
      await deleteDoc(orderDoc);
      return { success: true, data: orderId };
    } catch (error) {
      console.error("Error deleting order:", error);
      return { success: false, error: error.message };
    }
  },
};

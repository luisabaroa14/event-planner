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
import { parseDateAtMidnight } from "@/utils/functions";

const db = getFirestore(firebaseApp);
const eventsCollection = collection(db, "events");

export default {
  async fetchEvents() {
    try {
      const querySnapshot = await getDocs(
        query(eventsCollection, orderBy("date", "desc"))
      );
      const data = querySnapshot.docs.map((doc) => {
        const document = doc.data();
        document.date = document.date.toDate();
        return { id: doc.id, ...document };
      });

      return { success: true, data: data };
    } catch (error) {
      console.error("Error fetching events:", error);
      return { success: false, error: error.message };
    }
  },

  async createEvent(event) {
    try {
      event.date = parseDateAtMidnight(event.date);
      const docRef = await addDoc(eventsCollection, event);
      const data = { id: docRef.id, ...event };
      return { success: true, data: data };
    } catch (error) {
      console.error("Error creating event:", error);
      return { success: false, error: error.message };
    }
  },

  async updateEvent(event) {
    try {
      event.date = parseDateAtMidnight(event.date);
      const eventDoc = doc(eventsCollection, event.id);
      await updateDoc(eventDoc, event);
      return { success: true, data: event };
    } catch (error) {
      console.error("Error updating event:", error);
      return { success: false, error: error.message };
    }
  },

  async deleteEvent(eventId) {
    try {
      const eventDoc = doc(eventsCollection, eventId);
      await deleteDoc(eventDoc);
      return { success: true, data: eventId };
    } catch (error) {
      console.error("Error deleting event:", error);
      return { success: false, error: error.message };
    }
  },
};

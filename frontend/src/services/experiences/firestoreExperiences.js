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
const experiencesCollection = collection(db, "experiences");

export default {
  async fetchExperiences() {
    try {
      const querySnapshot = await getDocs(query(experiencesCollection));
      const data = querySnapshot.docs.map((doc) => {
        const document = doc.data();
        return { id: doc.id, ...document };
      });

      return { success: true, data: data };
    } catch (error) {
      console.error("Error fetching experiences:", error);
      return { success: false, error: error.message };
    }
  },

  async createExperience(experience) {
    try {
      const docRef = await addDoc(experiencesCollection, experience);
      const data = { id: docRef.id, ...experience };
      return { success: true, data: data };
    } catch (error) {
      console.error("Error creating experience:", error);
      return { success: false, error: error.message };
    }
  },

  async updateExperience(experience) {
    try {
      const experienceDoc = doc(experiencesCollection, experience.id);
      await updateDoc(experienceDoc, experience);
      return { success: true, data: experience };
    } catch (error) {
      console.error("Error updating experience:", error);
      return { success: false, error: error.message };
    }
  },

  async deleteExperience(experienceId) {
    try {
      const experienceDoc = doc(experiencesCollection, experienceId);
      await deleteDoc(experienceDoc);
      return { success: true, data: experienceId };
    } catch (error) {
      console.error("Error deleting experience:", error);
      return { success: false, error: error.message };
    }
  },
};

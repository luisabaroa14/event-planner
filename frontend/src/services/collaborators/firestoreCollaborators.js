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
const collaboratorsCollection = collection(db, "collaborators");

export default {
  async fetchCollaborators() {
    try {
      const querySnapshot = await getDocs(query(collaboratorsCollection));
      const data = querySnapshot.docs.map((doc) => {
        const document = doc.data();
        return { id: doc.id, ...document };
      });

      return { success: true, data: data };
    } catch (error) {
      console.error("Error fetching collaborators:", error);
      return { success: false, error: error.message };
    }
  },

  async createCollaborator(collaborator) {
    try {
      const docRef = await addDoc(collaboratorsCollection, collaborator);
      const data = { id: docRef.id, ...collaborator };
      return { success: true, data: data };
    } catch (error) {
      console.error("Error creating collaborator:", error);
      return { success: false, error: error.message };
    }
  },

  async updateCollaborator(collaborator) {
    try {
      const collaboratorDoc = doc(collaboratorsCollection, collaborator.id);
      await updateDoc(collaboratorDoc, collaborator);
      return { success: true, data: collaborator };
    } catch (error) {
      console.error("Error updating collaborator:", error);
      return { success: false, error: error.message };
    }
  },

  async deleteCollaborator(collaboratorId) {
    try {
      const collaboratorDoc = doc(collaboratorsCollection, collaboratorId);
      await deleteDoc(collaboratorDoc);
      return { success: true, data: collaboratorId };
    } catch (error) {
      console.error("Error deleting collaborator:", error);
      return { success: false, error: error.message };
    }
  },
};

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  /**
   * Uploads a file to Firebase Storage and returns the download URL.
   * @param {File} file - The file to be uploaded.
   * @param {string} storagePath - The reference path in Firebase Storage where the file should be uploaded.
   * @returns {Promise<string>} - A promise that resolves with the download URL of the uploaded file.
   */
  async uploadFile(file, storagePath) {
    const storage = getStorage();
    const storageRef = ref(storage, storagePath);

    try {
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      return { success: true, data: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

import { useFirestore } from "@/utils/config";
import firestoreFiles from "./firestoreFiles";

let filesService;

if (useFirestore) {
  filesService = firestoreFiles;
}

export default filesService;
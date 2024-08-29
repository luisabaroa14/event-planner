import { useFirestore } from "@/utils/config";
import firestoreCollaborators from "./firestoreCollaborators";

let collaboratorService;

if (useFirestore) {
  collaboratorService = firestoreCollaborators;
}

export default collaboratorService;
import { useFirestore } from "@/utils/config";
import firestoreExperiences from "./firestoreExperiences";

let experienceService;

if (useFirestore) {
  experienceService = firestoreExperiences;
}

export default experienceService;
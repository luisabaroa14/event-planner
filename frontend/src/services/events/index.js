import { useFirestore } from "@/utils/config";
import firestoreEvents from "./firestoreEvents";

let eventService;

if (useFirestore) {
  eventService = firestoreEvents;
}

export default eventService;
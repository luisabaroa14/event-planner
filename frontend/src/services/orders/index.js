import { useFirestore } from "@/utils/config";
import firestoreOrders from "./firestoreOrders";

let orderService;

if (useFirestore) {
  orderService = firestoreOrders;
}

export default orderService;
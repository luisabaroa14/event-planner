import { useFirestore } from "@/utils/config";
import firestoreProducts from "./firestoreProducts";

let productService;

if (useFirestore) {
  productService = firestoreProducts;
}

export default productService;
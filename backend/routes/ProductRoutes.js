import express from "express";
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

//Routes
router.route("/products").get(verifyUserAuth, getAllProducts);
router
  .route("/admin/product/create")
  .post(verifyUserAuth, roleBasedAccess("admin"), createProducts);
router
  .route("/admin/product/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);
router.route("/product/:id").get(getSingleProduct);

export default router;

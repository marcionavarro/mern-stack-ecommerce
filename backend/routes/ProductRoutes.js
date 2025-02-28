import express from "express";
import {
  createProducts,
  createReviewForProduct,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getAllProducts,
  getReview,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

//Routes
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/reviews").get(getReview).delete(verifyUserAuth, deleteReview);
router.route("/review").put(verifyUserAuth, createReviewForProduct);

router.route("/admin/products").get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);
router
  .route("/admin/product/create")
  .post(verifyUserAuth, roleBasedAccess("admin"), createProducts);
router
  .route("/admin/product/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);


export default router;

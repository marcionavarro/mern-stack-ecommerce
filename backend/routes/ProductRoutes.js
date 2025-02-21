import express from "express";
import {
    createProducts,
    deleteProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
} from "../controller/productController.js";
import {verifyUserAuth} from "../middleware/userAuth.js";

const router = express.Router();

//Routes
router.route("/products")
    .get(verifyUserAuth, getAllProducts)
    .post(createProducts);

router.route("/product/:id")
    .get(getSingleProduct)
    .put(updateProduct)
    .delete(deleteProduct);

export default router;

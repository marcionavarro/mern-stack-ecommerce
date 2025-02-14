import Product from "./../models/productModel.js";
import HandleError from "./../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "./../utils/apiFunctionality.js";


//http://localhost:8000/api/v1/product/67af51402e655bea63b027f1?keyword=shirt

// Creating Products
export const createProducts = handleAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const apiFunctionality = new APIFunctionality(Product.find(), req.query)
  .search().filter();
  const products = await apiFunctionality.query;
  res.status(200).json({
    success: true,
    products,
  });
});

// Update Product
export const updateProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product Deleted successfully",
  });
});

// Accesse Single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

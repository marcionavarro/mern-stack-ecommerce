import Product from "./../models/productModel.js";
import HandleError from "./../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "./../utils/apiFunctionality.js";

//http://localhost:8000/api/v1/product/67af51402e655bea63b027f1?keyword=shirt

// Creating Products
export const createProducts = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage = 1;
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search().filter();

  // Geting filtered query before pagination
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();

  // Calculate totalpages based on filtered count
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;
  

  if(page > totalPages && productCount > 0){
    return next(new HandleError("This page doesn't exist", 404));
  }

  // Apply pagination
  apiFeatures.pagination(resultsPerPage);
  const products = await apiFeatures.query;

  if(!products || products.length === 0) {
    return next(new HandleError("No Product Found", 404));
  }

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    totalPages,
    currentPage: page
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

// Admin - Getting all products
export const getAdminProducts = handleAsyncError(async(req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products
  })
})

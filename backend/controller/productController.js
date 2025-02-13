import Product from "./../models/productModel.js";

// Creating Products
export const createProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// Get all Products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

// Update Product
export const updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })
}

// Delete Product
export const deleteProduct = async (req, res) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }
    product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        message: "Product Deleted successfully"
    })
}
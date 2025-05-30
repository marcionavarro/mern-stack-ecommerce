import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../AdminStyles/UpdateProduct.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import {
  removeErrors,
  removeSuccess,
  updateProduct,
} from "../features/admin/adminSlice";
import { getProductDetails } from "../features/products/productSlice";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const { success, error, loading } = useSelector((state) => state.admin);
  const { product } = useSelector((state) => state.product);
  console.log("UpdateProduct:: ", product);
  const dispatch = useDispatch();
  const { updateId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductDetails(updateId));
  }, [dispatch, updateId]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImage(product.image);
    }
  }, [product]);

  const categories = [
    "mobile",
    "fruits",
    "laptop",
    "shirt",
    "shoes",
    "pants",
    "glass",
    "watch",
    "cookies",
    "Pomegranate",
    "socks",
    "bag",
    "mouse",
    "headphone",
    "bucket",
    "bangle",
    "ring",
    "lcd",
    "jacket",
    "tops",
  ];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImage([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImage((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const updateProductSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    image.forEach((img) => {
      myForm.append("image", img);
    });

    dispatch(updateProduct({ id: updateId, formData: myForm }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }

    if (success) {
      toast.success("Product update Succesfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/admin/products");
    }
  }, [dispatch, error, success]);

  return (
    <>
      <PageTitle title="Update Product" />
      <Navbar />
      <div className="update-product-wrapper">
        <h1 className="update-product-title">Update Product</h1>
        <form
          className="update-product-form"
          encType="multipart/form-data"
          onSubmit={updateProductSubmit}
        >
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="update-product-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="name">Product Price</label>
          <input
            type="number"
            name="price"
            id="price"
            className="update-product-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label htmlFor="description">Product Description</label>
          <textarea
            name="description"
            id="description"
            className="update-product-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label htmlFor="category">Product Category</label>
          <select
            name="category"
            id="category"
            className="update-product-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Choose a Category</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="stock">Product Stock</label>
          <input
            type="number"
            name="stock"
            id="stock"
            className="update-product-input"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          <label htmlFor="image">Product Images</label>
          <div className="update-product-file-wrapper">
            <input
              type="file"
              name="image"
              id="image"
              className="update-product-file-input"
              accept="image/"
              multiple
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="update-product-preview-wrapper">
            {imagePreview.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Product Preview"
                className="update-product-preview-image"
              />
            ))}
          </div>
          <div className="update-product-old-images-wrapper">
            {oldImage.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt="Product Preview"
                className="update-product-old-image"
              />
            ))}
          </div>
          <button className="update-product-submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UpdateProduct;

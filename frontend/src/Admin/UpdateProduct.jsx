import { useState } from "react";
import "../AdminStyles/UpdateProduct.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [oldImage, setOldImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const { success, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

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

  return (
    <>
      <PageTitle title="Update Product" />
      <Navbar />
      <div className="update-product-wrapper">
        <h1 className="update-product-title">Update Product</h1>
        <form className="update-product-form" encType="multipart/form-data">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="update-product-input"
            value={name}
            onChange={(e) => setName(e.target.name)}
            required
          />

          <label htmlFor="name">Product Price</label>
          <input
            type="number"
            name="price"
            id="price"
            className="update-product-input"
            value={price}
            onChange={(e) => setPrice(e.target.price)}
            required
          />

          <label htmlFor="description">Product Description</label>
          <textarea
            name="description"
            id="description"
            className="update-product-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.description)}
            required
          ></textarea>

          <label htmlFor="category">Product Category</label>
          <select
            name="category"
            id="category"
            className="update-product-select"
            value={category}
            onChange={(e) => setCategory(e.target.category)}
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
            onChange={(e) => setStock(e.target.stock)}
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
          <button className="update-product-submit-btn">Update</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UpdateProduct;

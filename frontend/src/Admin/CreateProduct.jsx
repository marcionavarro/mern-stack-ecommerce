import { useState } from "react";
import "../AdminStyles/CreateProduct.css";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import PageTitle from "../components/PageTitle";

function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = ["glass", "shirt", "mobile", "dress", "tv"];

  const createProductSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.setName("name", name);
    myForm.setName("price", price);
    myForm.setName("description", description);
    myForm.setName("category", category);
    myForm.setName("stock", stock);

    image.forEach((img) => {
      myForm.append("image", img);
    });
  };

  const createProductImage = (e) => {
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

  return (
    <>
      <PageTitle title="Create Product" />
      <Navbar />
      <div className="create-product-container">
        <h1 className="form-title">Create Product</h1>
        <form
          className="product-form"
          encType="multipart/form-data"
          onSubmit={createProductSubmit}
        >
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            name="price"
            className="form-input"
            placeholder="Enter Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            name="description"
            className="form-input"
            placeholder="Enter Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            name="category"
            className="form-select"
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
          <input
            type="number"
            name="stock"
            className="form-input"
            placeholder="Enter Product Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <div className="file-input-container">
            <input
              type="file"
              name="image"
              accept="image/"
              className="form-input-file"
              onChange={createProductImage}
              multiple
            />
          </div>
        <div className="image-preview-container">
            {imagePreview.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Product Review"
                className="image-preview"
              />
            ))}
          </div>
          <button className="submit-btn">Create</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateProduct;

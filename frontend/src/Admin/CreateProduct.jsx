import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../AdminStyles/CreateProduct.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import {
    createProduct,
    removeErrors,
    removeSuccess,
} from "../features/admin/adminSlice";

function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const { success, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const categories = ["glass", "shirt", "mobile", "dress", "tv", "pant"];

  const createProductSubmit = (e) => {
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

    dispatch(createProduct(myForm));
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

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }

    if (success) {
      toast.success("Product create Succesfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setStock("");
      setImage([]);
      setImagePreview([]);
    }
  }, [dispatch, error, success]);

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
          <button className="submit-btn" disabled={loading}>
            {loading ? "Creating Product..." : "Create"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateProduct;

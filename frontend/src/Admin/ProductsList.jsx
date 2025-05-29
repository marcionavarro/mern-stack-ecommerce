import { Delete, Edit } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../AdminStyles/ProductsList.css";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import PageTitle from "../components/PageTitle";
import { fetchAdminProducts, removeErrors } from "../features/admin/adminSlice";

function ProductsList() {
  const { products, loading, error } = useSelector((state) => state.admin);
  console.log("Product List:: ", products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  if (products || products.length === 0) {
    return (
      <>
        <PageTitle title="No Products Found" />
        <NavBar />
        <div className="no-admin-products-container">
          <h1 className="product-list-title">Admin Products</h1>
          <p className="no-admin-products">No Products Found</p>
        </div>
      </>
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Product List" />
          <NavBar />
          <div className="product-list-container">
            <h1 className="product-list-title">All Products</h1>
            <table className="product-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Ratings</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product.image[0].url}
                        alt={product.name}
                        className="admin-product-image"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.ratings}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>{new Date(product.createdAt).toLocaleString()}</td>
                    <td>
                      <Link to={`/admin/products/${product._id}`}>
                        <Edit className="action-icon edit-icon" />
                      </Link>
                      <Link to={`/admin/products/${product._id}`}>
                        <Delete className="action-icon delete-icon" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ProductsList;

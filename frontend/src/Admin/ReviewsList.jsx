import React, { useEffect } from "react";
import "../AdminStyles/ReviewsList.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts, removeErrors } from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function ReviewsList() {
  const { products, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  if (!products || products.length > 0) {
    return (
      <>
        <Navbar />
        <div className="reviews-list-container">
          <h1 className="reviews-list-title">Admin Reviews</h1>
          <div className="no-orders">
            <p className="no-order-message">No Products Found</p>
          </div>
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
          <PageTitle title="All Reviews" />
          <Navbar />
          <div className="reviews-list-container">
            <h1 className="reviews-list-title">All Products</h1>
            <table className="reviews-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Product Name</th>
                  <th>Product Image</th>
                  <th>Number of Reviews</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>
                      <img
                        src={product.image[0].url}
                        alt={product.name}
                        className="product-image"
                      />
                    </td>
                    <td>{product.numOfReviews}</td>
                    <td>
                      <button className="action-btn view-btn">
                        View reviews
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="reviews-details">
              <h2>Reviews for Product</h2>
              <table className="reviews-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Reviewer Name</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>MArcio</td>
                    <td>4</td>
                    <td>Good Product</td>
                    <td>
                      <button className="action-btn delete-btn">
                        <Delete />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ReviewsList;

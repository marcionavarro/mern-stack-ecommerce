import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../AdminStyles/ReviewsList.css";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import {
  clearMessage,
  deleteReview,
  fetchAdminProducts,
  fetchProductReviews,
  removeErrors,
  removeSuccess,
} from "../features/admin/adminSlice";

function ReviewsList() {
  const { products, loading, error, reviews, success, message } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      dispatch(clearMessage());
      navigate("/admin/products")
    }
  }, [dispatch, error, success, message]);

  const handleViewReviews = (productId) => {
    setSelectedProduct(productId);
    dispatch(fetchProductReviews(productId));
  };

  const handleDeleteReview = (productId, reviewId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review ?"
    );
    if (confirm) {
      dispatch(deleteReview({ productId, reviewId }));
    }
  };

  if (!products || products.length === 0) {
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
                      {product.numOfReviews > 0 && (
                        <button
                          className="action-btn view-btn"
                          onClick={() => handleViewReviews(product._id)}
                        >
                          View reviews
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedProduct && reviews && reviews.length > 0 && (
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
                    {reviews.map((review, idx) => (
                      <tr key={review._id}>
                        <td>{idx + 1}</td>
                        <td>{review.name}</td>
                        <td>{review.rating}</td>
                        <td>{review.comment}</td>
                        <td>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => {
                              handleDeleteReview(selectedProduct, review._id);
                            }}
                          >
                            <Delete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ReviewsList;

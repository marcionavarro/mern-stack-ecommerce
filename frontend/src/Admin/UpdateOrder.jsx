import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../AdminStyles/UpdateOrder.css";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import {
  removeErrors,
  removeSuccess,
  updateOrderStatus,
} from "../features/admin/adminSlice";
import { getOrderDetails } from "../features/order/orderSlice";

function UpdateOrder() {
  const [status, setStatus] = useState("");
  const { orderId } = useParams();
  const { order, loading: orderLoading } = useSelector((state) => state.order);
  const {
    success,
    loading: adminLoading,
    error,
  } = useSelector((state) => state.admin);
  const loading = orderLoading || adminLoading;
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  const {
    shippingInfo = {},
    orderItems = [],
    paymentInfo = {},
    orderStatus,
    totalPrice,
  } = order;
  const paymentStatus =
    paymentInfo.status === "succeeded" ? "Paid" : "Not Paid";
  const finalOrderStatus =
    paymentStatus === "Not Paid" ? "Cancelled" : orderStatus;

  const handleStatusUpdate = () => {
    if (!status) {
      toast.error("Please select a status", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    dispatch(updateOrderStatus({ orderId, status }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }

    if (success) {
      toast.success("Order Status updated successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, error, success, orderId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Update Order" />
          <Navbar />
          <div className="update-order__container">
            <h1 className="update-order__title">Update Order</h1>
            <div className="update-order__details">
              <h2>Order Information</h2>
              <p>
                <strong>Order ID:</strong> {orderId}
              </p>
              <p>
                <strong>Shipping Address: </strong>
                {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.state}, {shippingInfo.country}-
                {shippingInfo.pinCode}
              </p>
              <p>
                <strong>Phone: </strong> {shippingInfo.phoneNo}
              </p>
              <p>
                <strong>Order Status: </strong> {finalOrderStatus}
              </p>
              <p>
                <strong>Payment Status: </strong> {paymentStatus}
              </p>
              <p>
                <strong>Total Price: </strong> {totalPrice}
              </p>
              <p>
                <strong></strong>
              </p>
            </div>

            <div className="update-order__items">
              <h2>Order Items</h2>
              <table className="update-order__table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((orderItem) => (
                    <tr key={orderItem._id}>
                      <td>
                        <img
                          src={orderItem.image}
                          alt={orderItem.name}
                          className="update-order__item-image"
                        />
                      </td>
                      <td>{orderItem.name}</td>
                      <td>{orderItem.quantity}</td>
                      <td>{orderItem.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="update-order__status">
              <h2>Update Status</h2>
              <select
                className="update-order__status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={loading || orderStatus === "Delivered"}
              >
                <option value="">Select Status</option>
                <option value="Shipped">Shipped</option>
                <option value="On The Way">On The Way</option>
                <option value="Delivered">Delivered</option>
              </select>

              <button
                className="update-order__update-button"
                onClick={handleStatusUpdate}
                disabled={loading || !status || orderStatus === "Delivered"}
              >
                Update Status
              </button>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default UpdateOrder;

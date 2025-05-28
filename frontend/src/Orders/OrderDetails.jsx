import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/NavBar";
import PageTitle from "../components/PageTitle";
import { getOrderDetails, removeErrors } from "../features/order/orderSlice";
import "../OrderStyles/OrderDetails.css";

function OrderDetails() {
  const { orderId } = useParams();
  const { order, loading, error } = useSelector((state) => state.order);
  console.log(order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error, orderId]);

  const {
    shippingInfo = {},
    orderItems = [],
    paymentInfo = {},
    orderStatus,
    totalPrice,
    taxPrice,
    shippingPrice,
    itemPrice,
    paidAt,
  } = order;

  const paymentStatus =
    paymentInfo?.status === "succeeded" ? "Paid" : "Not Paid";
  const finalOrderStatus =
    paymentStatus === "Not Paid" ? "Cancelled" : orderStatus;
  const orderStatusClass =
    finalOrderStatus === "Delivered"
      ? "delivered"
      : finalOrderStatus.toLowerCase();
  const paymentStatusClass = paymentStatus === "Paid" ? "paid" : "not-paid";

  return (
    <>
      <PageTitle title={orderId} />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="order-details__container">
          {/* Order Items table */}
          <div className="order-details__table-container">
            <h2 className="order-details__table-heading">Order Items</h2>
            <table className="order-details__table">
              <thead className="order-details__table-header">
                <tr>
                  <th className="order-details__table-header-cell">Image</th>
                  <th className="order-details__table-header-cell">Name</th>
                  <th className="order-details__table-header-cell">Quantity</th>
                  <th className="order-details__table-header-cell">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((orderItem) => (
                  <tr key={orderItem._id} className="order-details__table-row">
                    <td className="order-details__table-cell">
                      <img
                        src={orderItem.image}
                        alt={orderItem.name}
                        className="order-details__item-image"
                      />
                    </td>
                    <td className="order-details__table-cell">
                      {orderItem.name}
                    </td>
                    <td className="order-details__table-cell">
                      {orderItem.quantity}
                    </td>
                    <td className="order-details__table-cell">
                      {orderItem.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Shipping Info Table */}
          <div className="order-details__table-container">
            <h2 className="order-details__table-heading">Shipping Info</h2>
            <table className="order-details__table">
              <tbody>
                <tr className="order-details__table-row">
                  <th className="order-details__table-cell">Address</th>
                  <td className="order-details__table-cell">
                    {shippingInfo.address} - {shippingInfo.city}{" "}
                    {shippingInfo.state}
                    {"/"}
                    {shippingInfo.country} -{" CEP: "}
                    {shippingInfo.pinCode}
                  </td>
                </tr>
                <tr className="order-details__table-row">
                  <th className="order-details__table-cell">Phone</th>
                  <td className="order-details__table-cell">
                    {shippingInfo.phoneNo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="order-details__table-container">
            <h2 className="order-details__table-heading">Order Summary</h2>
            <table className="order-details__table">
              <tbody>
                <tr className="order-details__table-row">
                  <th className="order-details__table-cell">Order Status</th>
                  <td className="order-details__table-cell">
                    <span
                      className={`order-details__status ${orderStatusClass}`}
                    >
                      {finalOrderStatus}
                    </span>
                  </td>
                </tr>
                <tr className="order-details__table-row">
                  <th className="order-details__table-cell">Payment</th>
                  <td className="order-details__table-cell">
                    <span
                      className={`order-details__payment ${paymentStatusClass}`}
                    >
                      {paymentStatus}
                    </span>
                  </td>
                </tr>
                {paidAt && (
                  <tr className="order-details__table-row">
                    <th className="order-details__table-cell">Paid At</th>
                    <td className="order-details__table-cell">
                      {new Date(paidAt).toLocaleString()}
                    </td>
                  </tr>
                )}
                <tr className="order-details__table-row">
                  <th className="order-details__table-cell">Items Price</th>
                  <td className="order-details__table-cell">{itemPrice}</td>
                </tr>
                <tr className="order-details__table-row">
                  <th className="order-details__table-cell">Tax Price</th>
                  <td className="order-details__table-cell">{taxPrice}</td>
                </tr>
                <tr className="order-details__table-row">
                  <th className="order-details__table-cell">Shipping Price</th>
                  <td className="order-details__table-cell">{shippingPrice}</td>
                </tr>
                <tr className="order-details__table-row">
                  <th className="order-details__table-cell">Total Price</th>
                  <td className="order-details__table-cell">{totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default OrderDetails;

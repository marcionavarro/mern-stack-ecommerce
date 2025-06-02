import { Delete, Edit } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../AdminStyles/OrdersList.css";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";

import { toast } from "react-toastify";
import {
  clearMessage,
  deleteOrder,
  fetchAllOrders,
  removeErrors,
  removeSuccess,
} from "../features/admin/adminSlice";

function OrdersList() {
  const { orders, loading, error, success, message } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  console.log("OrdersList:: ", orders);
  console.log('message:: ', message)

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  const handleDelete = (orderId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user ?"
    );
    if (confirm) {
      dispatch(deleteOrder(orderId));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      dispatch(clearMessage());
      dispatch(fetchAllOrders());
    }
  }, [dispatch, error, success, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="All Orders" />
          <Navbar />
          {orders && orders.length === 0 ? (
            <div className="no-orders">
              <p className="no-order-message">No Orders Found</p>
            </div>
          ) : (
            <div className="ordersList-container">
              <h1 className="ordersList-title">All Orders</h1>
              <div className="ordersList-table-container">
                <table className="ordersList-table">
                  <thead>
                    <tr>
                      <th>Sl No</th>
                      <th>Order ID</th>
                      <th>Status</th>
                      <th>Total Price</th>
                      <th>Number Of Items</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, idx) => (
                      <tr key={order._id}>
                        <td>{idx + 1}</td>
                        <td>{order._id}</td>
                        <td
                          className={`order-status ${order.orderStatus.toLowerCase()}`}
                        >
                          {order.orderStatus}
                        </td>
                        <td>{order.itemPrice}</td>
                        <td>{order.orderItems.length}</td>
                        <td>
                          <Link
                            to={`/admin/order/${order._id}`}
                            className="action-icon edit-icon"
                          >
                            <Edit />
                          </Link>

                          <button
                            className="action-icon delete-icon"
                            onClick={() => handleDelete(order._id)}
                          >
                            <Delete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <Footer />
        </>
      )}
    </>
  );
}

export default OrdersList;

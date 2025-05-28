import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import PageTitle from "../components/PageTitle";
import "../OrderStyles/OrderDetails.css";

function OrderDetails() {
  return (
    <>
      <PageTitle title="Order ID" />
      <Navbar />
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
              <tr className="order-details__table-row">
                <td className="order-details__table-cell">
                  <img
                    src=""
                    alt="Image Item"
                    className="order-details__item-image"
                  />
                </td>
                <td className="order-details__table-cell">Mobile</td>
                <td className="order-details__table-cell">2</td>
                <td className="order-details__table-cell">600</td>
              </tr>
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
                  address, city, state, country, pincode
                </td>
              </tr>
              <tr className="order-details__table-row">
                <th className="order-details__table-cell">Phone</th>
                <td className="order-details__table-cell">1234567890</td>
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
                  <span className="order-details__status processing">
                    Processing
                  </span>
                </td>
              </tr>
              <tr className="order-details__table-row">
                <th className="order-details__table-cell">Payment status</th>
                <td className="order-details__table-cell">
                  <span className="order-details__payment paid">PAID</span>
                </td>
              </tr>
              <tr className="order-details__table-row">
                <th className="order-details__table-cell">Paid At</th>
                <td className="order-details__table-cell">26-05-2025</td>
              </tr>
              <tr className="order-details__table-row">
                <th className="order-details__table-cell">Items Price</th>
                <td className="order-details__table-cell">500</td>
              </tr>
              <tr className="order-details__table-row">
                <th className="order-details__table-cell">Tax Price</th>
                <td className="order-details__table-cell">100</td>
              </tr>
              <tr className="order-details__table-row">
                <th className="order-details__table-cell">Shipping Price</th>
                <td className="order-details__table-cell">50</td>
              </tr>
              <tr className="order-details__table-row">
                <th className="order-details__table-cell">Total Price</th>
                <td className="order-details__table-cell">650</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetails;

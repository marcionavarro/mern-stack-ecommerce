import PageTitle from "../components/PageTitle";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "../CartStyles/Cart.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  return (
    <>
      <PageTitle title="Your Cart" />
      <NavBar />
      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <div className="empty-cart-message">Your cart is empty</div>
          <Link to="/products" className="viewProducts">
            View Products
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-page">
            <div className="cart-items">
              <div className="cart-items-heading">Your Cart</div>
              <div className="cart-table">
                <div className="cart-table-header">
                  <div className="header-product">Product</div>
                  <div className="header-quantity">Quantity</div>
                  <div className="header-total item-total-heading">
                    Item Total
                  </div>
                  <div className="header-action item=">Actions</div>
                </div>

                {/* Cart Items */}
                {cartItems &&
                  cartItems.map((item) => (
                    <CartItem item={item} key={item.name} />
                  ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="price-summary">
              <h3 className="price-summary-heading">Price Summary</h3>
              <div className="summary-item">
                <div className="summary-label">Subtotal:</div>
                <div className="summary-value">200/-</div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Tax(18%):</div>
                <div className="summary-value">10/-</div>
              </div>

              <div className="summary-item">
                <div className="summary-label">shipping:</div>
                <div className="summary-value">50/-</div>
              </div>

              <div className="summary-total">
                <div className="total-label">total:</div>
                <div className="total-value">260/-</div>
              </div>
              <button className="checkout-btn">Procced to Checkout</button>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default Cart;

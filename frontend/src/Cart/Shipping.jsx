import React from "react";
import PageTitle from "../components/PageTitle";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import "../CartStyles/Shipping.css";

function Shipping() {
  return (
    <>
      <PageTitle title="Shipping Info" />
      <NavBar />
      <CheckoutPath activePath={2} />
      <div className="shipping-form-container">
        <div className="shipping-form-header">Shipping Details</div>
        <form className="shipping-form">
          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
              />
            </div>
            <div className="shipping-form-group">
              <label htmlFor="pinCode">Pincode</label>
              <input
                type="number"
                id="pinCode"
                name="pinCode"
                placeholder="Enter your pinCode"
              />
            </div>
            <div className="shipping-form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your number"
              />
            </div>
          </div>

          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="country">Country</label>
              <select name="country" id="country">
                <option value="">Select a country</option>
                <option value="US">United States</option>
                <option value="IN">India</option>
              </select>
            </div>

            <div className="shipping-form-group">
              <label htmlFor="state">State</label>
              <select name="state" id="state">
                <option value="">Select a State</option>
              </select>
            </div>

            <div className="shipping-form-group">
              <label htmlFor="city">City</label>
              <select name="city" id="city">
                <option value="">Select a City</option>
              </select>
            </div>
          </div>

          <button className="shipping-submit-btn">Continue</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Shipping;

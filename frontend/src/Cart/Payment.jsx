import React from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../CartStyles/Payment.css";
import CheckoutPath from "./CheckoutPath";
import { Link } from "react-router-dom";

function Payment() {
  const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));

  return (
    <>
      <PageTitle title="Payment Processing" />
      <Navbar />
      <CheckoutPath activePath={2} />
      <div className="payment-container">
        <Link to="/order/confirm" className="payment-go-back">
          Go Back
        </Link>
        <button className="payment-btn">Pay ({orderItem.total})</button>
      </div>
      <Footer />
    </>
  );
}

export default Payment;

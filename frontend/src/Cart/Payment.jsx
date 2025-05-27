import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../CartStyles/Payment.css";
import CheckoutPath from "./CheckoutPath";
import { Link } from "react-router-dom";
import axios from "axios";
import StripeForm from "./StripeForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { set } from "mongoose";

function Payment() {
  const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState(null);
  const [billingDetails, setBillingDetails] = useState({});
  const [paymentId, setPaymentId] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchKey = async () => {
      const { data: keyData } = await axios.get("/api/v1/getKey");
      const { key } = keyData;
      console.log(stripePromise);
      setStripePromise(loadStripe(key));
    };
    fetchKey();
  }, []);

  const completePayment = async (amount) => {
    const { data: orderData } = await axios.post("/api/v1/payment/process", {
      amount,
    });
    setBillingDetails({
      name: user.name,
      email: user.email,
      phone: shippingInfo.phoneNumber,
      address: {
        line1: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postal_code: shippingInfo.pinCode,
        country: shippingInfo.country,
      },
    });
    setPaymentId(orderData.order.id);
    setClientSecret(orderData.order.client_secret);
  };

  return (
    <>
      <PageTitle title="Payment Processing" />
      <Navbar />
      <CheckoutPath activePath={2} />
      <div className="payment-container">
        <div className="payment-action">
          <Link to="/order/confirm" className="payment-go-back">
            Go Back
          </Link>
          {!clientSecret ? (
            <button
              className="payment-btn"
              onClick={() => completePayment(orderItem.total)}
              disabled={!stripePromise}
            >
              Pay ({orderItem.total})
            </button>
          ) : (
            stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripeForm
                  clientSecret={clientSecret}
                  billingDetails={billingDetails}
                  paymentId={paymentId}
                />
              </Elements>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;

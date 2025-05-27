import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { removeErrors, removeMessage } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function StripeForm({ clientSecret, billingDetails }) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      },
    });

    if (result.error) {
      toast.error(result.error.message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    } else if (result.paymentIntent.status === "succeeded") {
      toast.success("Pagamento realizado com sucesso!", {
        position: "top-center",
        autoClose: 3000,
        toastId: "cart-update",
      });
      dispatch(removeMessage());
      navigate("/api/v1/paymentVerification");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <CardElement />
      <button type="submit" disabled={!stripe} className="payment-btn-checkout">
        Pagar
      </button>
    </form>
  );
}

export default StripeForm;

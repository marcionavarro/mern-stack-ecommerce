import { stripe } from "../utils/stripe.js";
import handleAsyncError from "../middleware/handleAsyncError.js";

export const processPayment = handleAsyncError(async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "BRL",
    description: "Ecommerce Website Payment Transaction",
  };

  const order = await stripe.paymentIntents.create(options);

  res.status(200).json({
    success: true,
    order,
  });
});

// Sen API Key
export const sendAPIKey = handleAsyncError(async (req, res) => {
  res.status(200).json({
    key: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});


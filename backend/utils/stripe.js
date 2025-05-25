import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

export const stripe = new Stripe(process.env.STRIPE_SECRET, {
  httpClient: Stripe.createFetchHttpClient(),
});

export const getStripeCustomerByEmail = async (email) => {
  const customers = await stripe.customers.list({ email });
  return customers.data.length > 0 ? customers.data[0] : null;
};

export const createStripeCustomer = async ({ email, name }) => {
  const customer = await getStripeCustomerByEmail(email);
  if (customer) return customer;

  return stripe.customers.create({
    email,
    name,
  });
};

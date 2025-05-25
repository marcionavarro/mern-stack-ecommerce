import { stripe } from "../utils/stripe.js";
import handleAsyncError from "../middleware/handleAsyncError.js";


export const processPayment = handleAsyncError(async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: 'BRL'
    }

    const order = await stripe.paymentIntents.create(options);
    res.status(200).json({
        success: true,
        order
    })
})
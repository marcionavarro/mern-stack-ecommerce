import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import productReducer from "../features/products/productSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    admin: adminReducer,
  },
});

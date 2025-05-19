import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Add items to cart
export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      console.log("Add items to cart", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An Error ocurred");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
    success: false,
    message: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Add items to cart
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        const item = action.payload;
        console.log("Item::", item);
      })
      .addCase(addItemsToCart.rejected, (state) => {
        state.loading = false;
        state.error = action.payload?.message || "An Error Occurred.";
      });
  },
});

export const { removeErrors, removeMessage } = cartSlice.actions;
export default cartSlice.reducer;
